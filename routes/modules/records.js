const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


// 進入新增頁面
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

module.exports = router
