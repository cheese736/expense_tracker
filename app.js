// require packages used in the project
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
// const usePassport = require('./config/passport')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// const routes = require('./routes')
const PORT = process.env.PORT || 3000

const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req,res) => {
  res.render('index')
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})