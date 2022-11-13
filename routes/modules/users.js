const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

// GET登入頁
router.get('/login', (req, res) => {
  res.render('login')
})

// POST 登入頁
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

//  GET 註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

// POST 註冊頁
router.post('/register', (req,res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if ( [name,email,password,confirmPassword].includes('')) {
    errors.push({message: '所有欄位都是必填。'})
  }

  if (password !== confirmPassword) {
    errors.push({message: '密碼與確認密碼不相符'})
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({email})
  .then(user => { 
    if (user) {
      errors.push({message: 'This email has been used'})
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => {
        return User.create({
          name,
          email,
          password: hash
        })
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})


module.exports = router