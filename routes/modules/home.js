const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record') 

const images = [
  {'fascode': '<i class="fa-solid fa-house fa-2xl"></i>', 'categoryId': 1}, //家居物業
  {'fascode': '<i class="fa-solid fa-face-grin-beam fa-2xl"></i>', 'categoryId': 2}, //休閒
  {'fascode': '<i class="fa-solid fa-van-shuttle fa-2xl"></i>', 'categoryId': 3}, //交通出行
  {'fascode': '<i class="fa-solid fa-pen fa-2xl"></i>', 'categoryId': 4}, // 其他
  {'fascode': '<i class="fa-solid fa-utensils fa-2xl"></i>', 'categoryId': 5}, // 餐飲食品
]

router.get('/', (req, res) => {
  async function renderHome() {
    const userId = req.user._id
    const categories = await Category.find().lean().sort({_id: 'asc'})
    const records = await Record.find({userId}).lean()
    const modifiedRecords = records.map(record => {
      record.date = record.date.toISOString().split('T')[0]
      record.fascode = images.find(img => img.categoryId === record.categoryId).fascode
      return record
    })
    
    // 處理總開銷
    let totalAmount = 0
    records.forEach(record => totalAmount += record.amount)
    res.render('index',{categories, modifiedRecords, totalAmount})
  }

  renderHome()
})

module.exports = router
