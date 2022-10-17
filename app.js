if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerDocument = require('./swagger')

const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')

const passport = require('./config/passport')
const { apis } = require('./routes')

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(passport.initialize())

app.use(cors())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/api', apis)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

module.exports = app
