import { Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'

import Rating from '../models/Rating'
import Comic from '../models/Comic'
import { Credentials, VerifyRequest } from '../types'

export default class RatingController {
  static create(req: VerifyRequest, res: Response) {
    jwt.verify(String(req.accessToken), 'secret key', (verifyErr, credentials: Credentials | object | undefined) => {
      if (verifyErr) {
        return res.sendStatus(403)
      }

      const { value, comicId } = req.body
      const { _id: userId } = credentials as Credentials // get user profile by credential's data
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

  static getUserRatings(req: VerifyRequest, res: Response) {
    jwt.verify(
      String(req.accessToken),
      'secret key',
      (verifyErr: VerifyErrors | null, credentials: Credentials | object | undefined) => {
        if (verifyErr) {
          return res.sendStatus(Number(verifyErr))
        }

        const { _id: credentialId } = credentials as Credentials

        const query: any = {
          userId: credentialId, // get user profile by credential's data
        }

        return Rating.find(query, 'comicId', (findErr, ratings) => {
          if (findErr) {
            return res.send(findErr)
          }

          const parsedRatings = ratings.map(rating => rating.comicId)

          return res.json(parsedRatings)
        })
      }
    )
  }
}
