const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const db = mongoose.connection

mongoose.connect(process.env.MONGODB2_URI, { useNewUrlParser: true, useUnifiedTopology: true })


db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

autoIncrement.initialize(db)
// --------------------------------------------


const categorySchema = new mongoose.Schema(
  {
    _id: {type: Number, required: true},
    name: {type: String, required: true},
  }, 
  {
    versionKey: false,
  }
)

categorySchema.plugin(autoIncrement.plugin, {
    model: 'Category',
    field: '_id'
});

const Category = mongoose.model('Category', categorySchema)

Category.create({name: 'test'})





