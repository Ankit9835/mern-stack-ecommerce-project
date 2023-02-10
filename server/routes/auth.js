const express = require('express')
const router = express.Router()
const {createUser, currentUser} = require('../controllers/user')
const { authCheck,adminCheck } = require('../middlewares/auth')

router.post('/create-or-update-user', authCheck, createUser)
router.post('/current-user', authCheck, currentUser)
router.post('/current-admin', adminCheck, currentUser)

module.exports = router