// import packages
const express = require('express')
const router = express.Router()

// import modules
const home = require('./modules/home')
const records = require('./modules/records')
// const search = require('./modules/search')
const users = require('./modules/users')
// const auth = require('./modules/auth')


const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/records', records)
// router.use('/search', authenticator, search)
// router.use('/auth', auth)
router.use('/', home)
module.exports = router
