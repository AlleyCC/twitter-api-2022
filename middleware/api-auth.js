const passport = require('../config/passport')
const helpers = require('../_helpers')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: 'Unauthorized' })
    req.user = user
    next()
  })(req, res, next)
}

const authenticatedAdmin = (req, res, next) => {
  if (helpers.getUser(req).role === 'admin') return next()
  return res.status(403).json({ status: 'error', message: 'Permission denied' })
}

const authenticatedUser = (req, res, next) => {
  if (helpers.getUser(req).role === 'user') return next()
  return res.status(403).json({ status: 'error', message: 'Permission denied' })
}

module.exports = {
  authenticated,
  authenticatedAdmin,
  authenticatedUser
}
