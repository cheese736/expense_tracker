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

const User = mongoose.model('UsersOfExpenseTracker', userSchema)

User.create({name: 'test' ,email: 'test', password: 'test'})





