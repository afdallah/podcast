const mongoose = require('mongoose')
const slug = require('slug')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const schema = new Schema({
  title: { type: String, trim: true },
  created: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
  audio: { type: String, trim: true },
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  guest: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true},
  tags: [String],
  image: Object,
  slug: { type: String, required: true }
})

// schema
//   .virtual('slug')
//   .get(function () {
//     return slug(this.title)
//   })

module.exports = mongoose.model('Podcast', schema)