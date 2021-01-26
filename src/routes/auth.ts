import express from 'express'
import bodyParser from 'body-parser'

import AuthController from '../controllers/AuthController'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/profile', verifyToken, AuthController.getProfile)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

export default router
