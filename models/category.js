const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const db = mongoose.connection

autoIncrement.initialize(db)
// --------------------------------------------


const categorySchema = new mongoose.Schema(
  {
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, 
  {
    versionKey: false,
  }
)

categorySchema.plugin(autoIncrement.plugin, {
    model: 'Category',
    field: '_id',
    startAt: 1
});

module.exports = mongoose.model('Category', categorySchema)






