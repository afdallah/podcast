const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { upload } = require('../middleware')

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users)
  })
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) next(err)
    res.send(user)
  })
})

router.post('/', upload.single('photo'), (req, res, next) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    photo: {
      url: req.file.url,
      secure_url: req.file.secure_url
    },
    // podcasts: [{ type: Schema.Types.ObjectId, ref: 'Podcast' }]
  })

  user.save()
    .then(saved => res.json(saved))
    .catch(e => next(e))
})

router.put('/:id', upload.single('photo'), (req, res, next) => {
  if (req.file) {
    User.findByIdAndUpdate(
      req.params.id,
      { $set: {...req.body, photo: { url: req.file.url, secure_url: req.file.secure_url }} },
      (err, user) => {
        if (err) next(err)
        res.json({
          status: 'Update success',
          user
        })
    })
  } else {
    User.findByIdAndUpdate(
      req.params.id,
      { $set: {...req.body}},
      (err, user) => {
        if (err) next(err)
        res.json({
          status: 'Update success',
          user
        })
    })
  }
})

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) next(err)
    res.send('Deleted succesfully')
  })
})

module.exports = router