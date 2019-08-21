require('dotenv').config()
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cookieSession = require('cookie-session')
const { ensureAuthorized } = require('./middleware')

const User = require('./models/user')
const episodeRoutes = require('./routes/episode')
const userRoutes = require('./routes/user')
const publishRoutes = require('./routes/publish')
const resolveHost = require('./utils').resolveHost

const dbstring = dev ?
  'mongodb://localhost:27017/ngobrolim' :
  'mongodb://afdallah:biasa123@ds117334.mlab.com:17334/ngobrolim'

// Open connection to database
const db = mongoose.connect(dbstring, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

app.prepare().then(() => {
  const server = express()

  server.use(cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 30,
    keys: ['asuperstrongpodcastkey']
  }))

  server.use(passport.initialize())
  server.use(passport.session())

  // Middleware to parse form data
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }));

  // Setup facebook auth
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callback: `${resolveHost()}/auth/facebook/callback`,
    passReqToCallback   : true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'work']
  }, function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user)
    })
  }))

  server.get('/auth/facebook', passport.authenticate('facebook'))

  server.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function(req, res) {
      res.redirect('/')
    }
  )

  server.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/'); //Inside a callback… bulletproof!
  })

  passport.serializeUser(function (user, cb) {
    cb(null, user.id)
  })

  passport.deserializeUser(function (id, cb) {
    User.findById(id, function(err, user) {
      cb(err, user);
    });
  })

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: `/auth/google/callback`
  },
    function(token, tokenSecret, profile, done) {
      User.findOne({ googleId: profile.id })
        .then(currentUser => {
          if (currentUser) {
            // console.log('User EXIST', currentUser)
            done(null, currentUser)
          } else {
            new User({
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile._json.email,
              photo: {
                url: profile._json.picture,
                secure_url: profile._json.picture,
              }
            })
              .save()
              .then(newUser => {
                console.log('New user created', newUser)
                done(null, newUser)
              })
          }
      })
    }
  ))

  server.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));

  server.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, user) => {
      if (err) return next(err)
      if (!user) return res.redirect('/auth/google')
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect("/");
      })
    })(req, res, next);
  });


  // Route for api
  server.use('/api/episode', episodeRoutes)
  server.use('/api/user', userRoutes)
  server.use('/api/publish', publishRoutes)

  // SSR routing
  const restrictAccess = function (req, res, next) {
    if (!req.isAuthenticated()) return res.redirect('/auth/google')
    next()
  }

  server.get('/episode/:id', (req, res) => {
    return app.render(req, res, '/episode', { id: req.params.id });
  });

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  // server.get('/publish', (req, res) => {
  //   return app.render(req, res, '/publish', req.query);
  // });

  server.use('/profile', restrictAccess)
  server.use('/publish', restrictAccess)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Server start ${resolveHost()}`)
  })
})
