// import packages
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
console.log(process.env.MONGODB4_URI)
// load mongoose db config & model 
const db = require('../../config/mongoose')
const User = require('../user')
const Category = require('../category')
const Record = require('../record')

// load seeds file
userSeeds = require('./userSeeds.json')
recordSeeds = require('./recordSeeds.json')

db.once('open', () => {
  async function recordSeeder() {
    await userSeeds.forEach(seed => {
      const salt = bcrypt.genSalt(10)
      const hash = bcrypt.hash(seed.password, salt)
      User.create({
        name: seed.name,
        email: seed.email,
        password: hash
      })
    })
    await recordSeeds.forEach(seed => {
      Record.create({
        name: seed.name,
        date: Date(seed.date),
        amount: Number(seed.amount),
        userId: Number(seed.userId),
        categoryId: Number(seed.categoryId)
      })
    })
  }
  recordSeeder()
})

