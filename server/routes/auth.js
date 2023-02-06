const express = require('express')
const router = express.Router()
const {createUser} = require('../controllers/user')

router.get('/', createUser)

module.exports = router