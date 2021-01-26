import { Response, NextFunction } from 'express'
import { VerifyRequest } from '../types'

function verifyToken(req: VerifyRequest, res: Response, next: NextFunction) {
  const bearerHeader = req.headers.authorization

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]

    req.accessToken = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

export { verifyToken }
