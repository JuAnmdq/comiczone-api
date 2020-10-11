import express from 'express'
import bodyParser from 'body-parser'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

/* istanbul ignore next */
router.route('/').get(UserController.getAll).post(UserController.create)

router.route('/:id').get(UserController.getById).put(UserController.update).delete(UserController.delete)

router
  .route('/username/:username') // @TODO: Change it to GET /users?username={username}
  .get(UserController.userExists)

router
  .route('/email/:email') // @TODO: Change it to GET /users?email={email}
  .get(UserController.emailExists)

export default router
