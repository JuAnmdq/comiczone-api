import express from 'express'
import bodyParser from 'body-parser'
import StatisticController from '../controllers/StatisticController.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.route('/').get(StatisticController.getAll)

router.route('/:comicId').put(StatisticController.update)

export default router
