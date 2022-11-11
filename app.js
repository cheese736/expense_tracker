// import packages
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

// import files
// const usePassport = require('./config/passport')
const routes = require('./routes')


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// const routes = require('./routes')
const PORT = process.env.PORT || 3000

// template engine
const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req,res) => {
  res.render('index')
})

app.use(routes)


// PORT setting
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})