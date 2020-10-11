import express from 'express'
import bodyParser from 'body-parser'
import RatingController from '../controllers/RatingController.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.route('/').post(verifyToken, RatingController.create)

router.route('/user/comics').get(verifyToken, RatingController.getUserRatings)

export default router
