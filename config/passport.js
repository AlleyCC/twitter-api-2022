const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcrypt-nodejs')
const { User } = require('../models')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallBack: true
},
(req, email, password, cb) => {
  User.findOne({ where: { email } })
    .then(user => {
      // if user不存在
      if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
      // 驗證密碼是否正確
      bcrypt.compare(password, user.password).them(res => {
        if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
        // 密碼正確回傳資料
        return cb(null, user)
      })
    })
}
))
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  User.findByPk(jwtPayload.id)
    .then(user => cb(null, user))
    .catch(err => cb(err))
}))
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id)
    .then(user => {
      console.log(user)
      return cb(null, user)
    })
})
module.exports = passport
