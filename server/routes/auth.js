const express = require('express')
const router = express.Router()
const {createUser} = require('../controllers/user')
const { authCheck } = require('../middlewares/auth')

router.post('/create-or-update-user', authCheck, createUser)

module.exports = router