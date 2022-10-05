const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const adminController = require('../../controllers/admin-controller')
const userController = require('../../controllers/user-controller')
const tweetController = require('../../controllers/tweet-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../../middleware/api-auth')

// 後台
// Admin: sign in/sign up/ logout
router.post('/admin/signin', authenticated, authenticatedAdmin, adminController.signIn)
router.use('/admin', authenticated, authenticatedAdmin, admin)

// 前台
// Users
router.post('/signin', authenticated, userController.signIn)

// Tweets
// router.get('/tweets', authenticated, tweetController.getTweets)

// error handler
router.use('/', apiErrorHandler)
module.exports = router