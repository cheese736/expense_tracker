const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const db = mongoose.connection
autoIncrement.initialize(db)

const userSchema = new mongoose.Schema(
  {
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createAt: {type: Date, default: Date.now},
  }, 
  {
    versionKey: false,
  }
)

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: '_id'
});

module.exports = mongoose.model('User', userSchema)





