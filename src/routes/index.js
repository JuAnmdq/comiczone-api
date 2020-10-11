import express from 'express'
import auth from './auth.js'
import users from './users.js'
import comics from './comics.js'
import comments from './comments.js'
import loans from './loans.js'
import ratings from './ratings.js'
import statistics from './statistics.js'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/comics', comics)
router.use('/comments', comments)
router.use('/loans', loans)
router.use('/ratings', ratings)
router.use('/statistics', statistics)

export default router
