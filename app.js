// import packages
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// import files
const usePassport = require('./config/passport')
const routes = require('./routes')

// read files
require('./config/mongoose')



const PORT = process.env.PORT || 3000

// template engine
const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


app.use(express.urlencoded({ extended: true }))  //It parses incoming requests with urlencoded payloads
app.use(methodOverride('_method'))

// use static files
app.use(express.static('public'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})

app.use(routes)
// PORT setting
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
