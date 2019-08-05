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
const User = require('./models/user')

const episodeRoutes = require('./routes/episode')
const userRoutes = require('./routes/user')
const publishRoutes = require('./routes/publish')

const dbstring = dev ?
  'mongodb://localhost:27017/ngobrolim' :
  'mongodb://afdallah:biasa123@ds117334.mlab.com:17334/ngobrolim'

// Open connection to database
const db = mongoose.connect(dbstring, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

mongoose.set('debug', true)

app.prepare().then(() => {
  const server = express()

  // Middleware to parse form data
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }));

  // Route for api
  server.use('/api/episode', episodeRoutes)
  server.use('/api/user', userRoutes)
  server.use('/api/publish', publishRoutes)

  // SSR routing
  server.get('/episode/:id', (req, res) => {
    return app.render(req, res, '/episode', { id: req.params.id });
  });

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  server.get('/publish', (req, res) => {
    return app.render(req, res, '/publish', req.query);
  });

  console.log(`${process.env.HOST}:${process.env.PORT}/auth/facebook/callback`)
  // Setup facebook auth
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callback: `${process.env.HOST}:${process.env.PORT}/auth/facebook/callback`,
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

  passport.serializeUser(function (user, cb) {
    cb(null, user)
  })

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj)
  })


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Server start ${process.env.HOST}:${port}`)
  })
})
