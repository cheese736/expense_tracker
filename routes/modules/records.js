const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


// 進入餐廳新增頁面
router.get('/new', (req, res) => {
  // 
  Category.find().lean()
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
    new Date(req.body.date),
    Number(req.body.category),
    Number(req.body.amount)
  ]

  Record.create({
    name, date, categoryId, amount, userId
  })
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
})


// 進入搜尋結果
router.get('/search', (req, res) => {
})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
})

// 進入編輯頁面

router.get('/:id/edit', (req, res) => {
})

// 修改一筆資料
router.put('/:id', (req, res) => {
})

module.exports = router
