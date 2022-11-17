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


// 進入篩選結果結果
router.get('/filter/:categoryId', (req, res) => {

})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
  console.log(req.params)
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 進入編輯頁面

router.get('/:id/edit', (req, res) => {
})

// 修改一筆資料
router.put('/:id', (req, res) => {
})

module.exports = router
