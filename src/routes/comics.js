import express from 'express'
import bodyParser from 'body-parser'
import ComicController from '../controllers/ComicController.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.route('/').get(ComicController.getAll).post(ComicController.create)

router.route('/:id').get(ComicController.getById).put(ComicController.update).delete(ComicController.delete)

export default router
