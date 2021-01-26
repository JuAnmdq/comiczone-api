import express from 'express'
import auth from './auth'
import users from './users'
import comics from './comics'
import comments from './comments'
import loans from './loans'
import ratings from './ratings'
import statistics from './statistics'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/comics', comics)
router.use('/comments', comments)
router.use('/loans', loans)
router.use('/ratings', ratings)
router.use('/statistics', statistics)

export default router
