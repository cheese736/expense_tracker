const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record') 

const images = [
  {'fascode': '<i class="fa-solid fa-house"></i>', 'categoryId': 1}, //家居物業
  {'fascode': '<i class="fa-solid fa-face-grin-beam"></i>', 'categoryId': 2}, //休閒
  {'fascode': '<i class="fa-solid fa-van-shuttle"></i>', 'categoryId': 3}, //交通出行
  {'fascode': '<i class="fa-solid fa-pen"></i>', 'categoryId': 4}, // 其他
  {'fascode': '<i class="fa-solid fa-utensils"></i>', 'categoryId': 5}, // 餐飲食品
]

console.log(images[0].fascode)



// home: "https://fontawesome.com/icons/home?style=solid",
//   traffic: "https://fontawesome.com/icons/shuttle-van?style=solid",
//   entertainment: "https://fontawesome.com/icons/grin-beam?style=solid",
//   food: "https://fontawesome.com/icons/utensils?style=solid",
//   others: "https://fontawesome.com/icons/pen?style=solid"


router.get('/', (req, res) => {

  
  async function renderHome() {
    const userId = req.user._id
    const categories = await Category.find().lean().sort({_id: 'asc'})
    console.log(categories)
    const records = await Record.find({userId}).lean()
    const modifiedRecords = records.map(record => {
      record.date = record.date.toISOString().split('T')[0]
      record.fascode = images.find(img => img.categoryId === record.categoryId).fascode
      return record
    })
    console.log(records)
    res.render('index',{categories, modifiedRecords})
  }
  renderHome()
})

module.exports = router
