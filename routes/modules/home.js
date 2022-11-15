const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record') 

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}
console.log(CATEGORY.家居物業)

router.get('/', (req, res) => {

  async function renderHome() {
    const userId = req.user._id
    const categories = await Category.find().lean().sort({_id: 'asc'})
    console.log(categories)
    const records = await Record.find({userId}).lean()
    const modifiedRecords = records.map(record => {
      record.date = record.date.toISOString().split('T')[0]
      return record
    })
    console.log(records)
    res.render('index',{categories, modifiedRecords})
  }
  renderHome()
  // Category.find().lean()
  // .then(categories => {
  //   res.render('index', {categories})
  // })
})

module.exports = router
