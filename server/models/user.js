const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const mongooseUniqueValidator = require('mongoose-unique-validator')

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: String,
  displayName: String,
  googleId: String,
  photo: { type: Object },
  email: { type: String, required: true, unique: true },
  level: { type: Number, default: 2 }, // 1: Superadmin, 2: regular
  podcasts: [{ type: Schema.Types.ObjectId, ref: 'Podcast' }]
})

schema
  .virtual('fullName')
  .get(function () {
    return this.firstName + ' ' + this.lastName
  })

mongoose.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('User', schema)