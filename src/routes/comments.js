import express from 'express'
import bodyParser from 'body-parser'
import CommentController from '../controllers/CommentController.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.route('/').get(CommentController.getAll).post(verifyToken, CommentController.create)

router.route('/:comicId').get(CommentController.getAllByComicId)

router.route('/:id').delete(CommentController.delete)

export default router
