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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      index: true,
      required: true
    }
  }, 
  {
    versionKey: false,
  }
)

recordSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: '_id'
});

const Record = mongoose.model('Record', recordSchema)

// Record.create({name: 'test' ,email: 'test', password: 'test'})





