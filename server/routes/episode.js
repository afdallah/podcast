const express = require('express')
const router = express.Router()
const Episode = require('../models/podcast')
const { upload } = require('../middleware')

router.get('/', (req, res, next) => {
  Episode
    .find()
    .populate('host')
    .exec((err, episode) => {
      if (err) next(err)

      res.json(episode)
    })
})

router.get('/:id', (req, res, next) => {
  Episode.findById(req.params.id, (err, episode) => {
    if (err) next(err)
    res.json(episode)
  })
})

router.post('/', upload.single('image'), (req, res, next) => {
  const episode = new Episode({
    title: req.body.title,
    published: req.body.published,
    audio: req.body.audio,
    host: req.body.host,
    guest: req.body.guest,
    content: req.body.content,
    tags: req.body.tags,
    image: {
      url: req.file.url,
      secure_url: req.file.secure_url
    },
    slug: req.body.slug
  })

  episode.save()
    .then(saved => res.json(saved))
    .catch(e => next(e))
})

router.put('/:id', upload.single('image'), (req, res, next) => {
  Episode.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, episode) => {
    if (err) next(err)
    res.send('Episode updated')
  })
})

router.delete('/:id', (req, res, next) => {
  Episode.findByIdAndRemove(req.params.id, (err) => {
    if (err) next(err)
    res.send('Deleted succesfully')
  })
})

module.exports = router