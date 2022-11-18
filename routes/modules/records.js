const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

const images = [
  {'fascode': '<i class="fa-solid fa-house fa-2xl"></i>', 'categoryId': 1}, //家居物業
  {'fascode': '<i class="fa-solid fa-face-grin-beam fa-2xl"></i>', 'categoryId': 2}, //休閒
  {'fascode': '<i class="fa-solid fa-van-shuttle fa-2xl"></i>', 'categoryId': 3}, //交通出行
  {'fascode': '<i class="fa-solid fa-pen fa-2xl"></i>', 'categoryId': 4}, // 其他
  {'fascode': '<i class="fa-solid fa-utensils fa-2xl"></i>', 'categoryId': 5}, // 餐飲食品
]


// 進入新增頁面
router.get('/new', (req, res) => {
  // 
  Category.find().lean().sort({_id: 'asc'})
  .then(categories => {
    res.render('new', {categories})
  })
})

// 新增一筆資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const [name, date, categoryId, amount] =
  [
    req.body.name,
    req.body.date,
    Number(req.body.category),
    Number(req.body.amount)
  ]

  Record.create({
    name, date, categoryId, amount, userId
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 進入編輯頁面

router.get('/:id/edit', (req, res) => {
  async function renderEdit() {
    try {
      const id = req.params.id
      const categories = await Category.find().lean().sort({_id: 'asc'})
      const record = await Record.findById(id).lean()
      record.date = record.date.toISOString().split('T')[0]
      record.category = categories.find(el => el._id === record.categoryId).name
      res.render('edit', {record, categories})
    } catch (err) {
      console.log(err)
    }
  }
  renderEdit()
})

// 修改一筆資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  
  const [name, date, categoryId, amount] =
  [
    req.body.name,
    req.body.date,
    Number(req.body.category),
    Number(req.body.amount)
  ]

  Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      console.log(record)
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})

// 進入過濾頁面
router.get('/filter/:categoryId', (req,res) => {
  async function categoryFilter() {
    try {
      const categoryId = Number(req.params.categoryId)
      const userId = Number(req.user._id)
      const categories = await Category.find().lean().sort({_id: 'asc'})
      const filteredRecords = await Record.find({userId, categoryId}).lean()
      const modifiedRecords = filteredRecords.map(record => {
        record.date = record.date.toISOString().split('T')[0]
        record.fascode = images.find(img => img.categoryId === record.categoryId).fascode
        return record
      })
      let totalAmount = 0
      filteredRecords.forEach(record => {totalAmount += record.amount})
      res.render('index',{categories, modifiedRecords, totalAmount})
    } catch(err) {
      console.log(err)
    }
  }
  categoryFilter()
})

module.exports = router
