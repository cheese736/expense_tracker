const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// 進入餐廳新增頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆資料
router.post('/new', (req, res) => {
})
// 進入搜尋結果
router.get('/search', (req, res) => {
})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
})

// 進入餐廳詳細資料
router.get('/:id', (req, res) => {
})

// 進入餐廳編輯頁面

router.get('/:id/edit', (req, res) => {
})

// 修改一筆資料
router.put('/:id', (req, res) => {
})

module.exports = router
