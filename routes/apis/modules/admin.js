const express = require('express')
const router = express.Router()
const passport = require('../../../config/passport')
const adminController = require('../../../controllers/admin-controller')

const { authenticated, authenticatedAdmin } = require('../../../middleware/api-auth')

router.get('/users', authenticated, authenticatedAdmin, adminController.getUsers)
router.post('/signin', passport.authenticate('local', { session: false }), adminController.signIn)

module.exports = router
