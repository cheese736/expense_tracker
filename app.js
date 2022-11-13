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
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// use static files
app.use(express.static('public'))


usePassport(app)
app.use(flash())

app.use(routes)
// PORT setting
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
