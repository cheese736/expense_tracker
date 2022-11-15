const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
// const Resto = require('../../models/restaurant')

router.get('/', (req, res) => {
  Category.find().lean()
  .then(categories => {
    res.render('index', {categories})
  })
})

module.exports = router
