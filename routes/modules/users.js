const express = require('express')
const router = express.Router()
const passport = require('passport')
// const User = require('../../models/user')
const bycrypt = require('bcryptjs')

// GET登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router