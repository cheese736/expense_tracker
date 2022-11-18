const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const db = mongoose.connection

autoIncrement.initialize(db)
// --------------------------------------------


const recordSchema = new mongoose.Schema(
  {
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    date: {type: Date, required: true},
    amount: {type: Number, required: true},
    userId: {
      type: Number,
      index: true,
      required: true
    },
    categoryId: {
      type: Number,
      index: true,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, 
  
  {
    versionKey: false,
  }
)

recordSchema.plugin(autoIncrement.plugin, {
    model: 'Record',
    field: '_id',
    startAt: 1
});

module.exports = mongoose.model('Record', recordSchema)






