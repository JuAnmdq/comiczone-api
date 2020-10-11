import jwt from 'jsonwebtoken'
import Rating from '../models/Rating.js'
import Comic from '../models/Comic.js'

export default class RatingController {
  static create(req, res) {
    jwt.verify(req.accessToken, 'secret key', (verifyErr, credentials) => {
      if (verifyErr) {
        return res.sendStatus(403)
      }

      const { value, comicId } = req.body
      const userId = credentials._id // get user profile by credential's data
      const body = {
        value,
        comicId,
        userId,
      }
      const rating = new Rating(body)

      return rating.save((saveErr, newRating) => {
        if (saveErr) {
          return res.send(saveErr)
        }

        const query = {
          $push: { ratings: newRating._id },
        }

        return Comic.findByIdAndUpdate(comicId, query, (updateComicErr, newComic) => {
          if (updateComicErr) {
            return res.send(updateComicErr)
          }

          return res.json({ message: 'Rating added successfully' })
        })
      })
    })
  }

  static getUserRatings(req, res) {
    jwt.verify(req.accessToken, 'secret key', (verifyErr, credentials) => {
      if (verifyErr) {
        return res.sendStatus(verifyErr)
      }

      const query = {
        userId: credentials._id, // get user profile by credential's data
      }

      return Rating.find(query, 'comicId', (findErr, ratings) => {
        if (findErr) {
          return res.send(findErr)
        }

        const parsedRatings = ratings.map(rating => rating.comicId)

        return res.json(parsedRatings)
      })
    })
  }
}
