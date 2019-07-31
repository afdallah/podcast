const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Podcast = require('../models/podcast')

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users)
  })
})

module.exports = router