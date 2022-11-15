// import packages
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// load mongoose db config & model 
const db = require('../../config/mongoose')
const User = require('../user')
const Category = require('../category')
const Record = require('../record')

// load seeds file
userSeeds = require('./userSeeds.json')
categorySeeds = require('./categorySeeds.json')
recordSeeds = require('./recordSeeds.json')

db.once('open', () => {
  Promise.all(categorySeeds.map(category => {
    Category.create({name: category})
  }))
  .then(() => {
    Promise.all(userSeeds.map(user => {
      const {name,email, password} = user
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(user => {
          const filteredRecord = recordSeeds.filter(record => record.userId === user._id)
          return Record.create(filteredRecord)
        })
        .catch(err => console.log(err))
    }))
  })
  .then(() => {
    console.log()
  })
  .catch(err => console.log(err))
})

