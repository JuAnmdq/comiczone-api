import express from 'express'
import bodyParser from 'body-parser'
import AuthController from '../controllers/AuthController.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/register', AuthController.register)
router.post('/profile', verifyToken, AuthController.getProfile)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

export default router
