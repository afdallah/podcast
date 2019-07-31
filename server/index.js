require('dotenv').config()
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const episodeRoutes = require('./routes/episode')
const userRoutes = require('./routes/user')
const publishRoutes = require('./routes/publish')

// Open connection to database
const db = mongoose.connect('mongodb://afdallah:biasa123@ds117334.mlab.com:17334/ngobrolim', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

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

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Server start http://localhost:${port}`)
  })
})
