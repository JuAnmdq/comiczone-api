import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'

import routes from './routes/index'

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/v1', routes)
app.use(compression()) // Compress all routes

export default app
