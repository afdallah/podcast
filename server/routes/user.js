const express = require('express')
const router = express.Router()
const User = require('../models/user')

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

router.post('/', (req, res, next) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email
    // podcasts: [{ type: Schema.Types.ObjectId, ref: 'Podcast' }]
  })

  user.save()
    .then(saved => res.json(saved))
    .catch(e => next(e))
})

router.put('/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) next(err)
    res.send('User updated')
  })
})

router.delete('/:id', (req, res, next) => {
  Episode.findByIdAndRemove(req.params.id, (err) => {
    if (err) next(err)
    res.send('Deleted succesfully')
  })
})

module.exports = router