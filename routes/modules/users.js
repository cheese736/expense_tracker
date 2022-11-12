const express = require('express')
const router = express.Router()
const passport = require('passport')
// const User = require('../../models/user')
const bycrypt = require('bcryptjs')

// GET登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

//  GET 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router