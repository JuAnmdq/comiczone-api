import express from 'express'
import bodyParser from 'body-parser'
import LoanController from '../controllers/LoanController'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.route('/').get(LoanController.getAll).post(LoanController.create)

router.route('/currents').get(LoanController.getCurrents)

router.route('/historical').get(verifyToken, LoanController.getHistorical)

export default router
