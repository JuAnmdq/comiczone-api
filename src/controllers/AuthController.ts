import { Request, Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import User from '../models/User'
import { Credentials, VerifyRequest } from '../types'

export default class AuthController {
  static register(req: Request, res: Response) {
    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) {
      return res.status(401).send({
        message: 'Password doesnt match',
      })
    }
    delete req.body.confirmPassword

    const user = new User(req.body)
    return user.save(err => {
      if (err) {
        return res.send(err)
      }

      return res.json({ message: 'User added successfully' })
    })
  }

  static getProfile(req: VerifyRequest, res: Response) {
    jwt.verify(
      String(req?.accessToken),
      'secret key',
      (verifyErr: VerifyErrors | null, credentials: Credentials | object | undefined) => {
        if (verifyErr) {
          return res.status(403).send({
            message: verifyErr.message,
          })
        }

        const { username, password } = credentials as Credentials

        // get user profile by credential's data
        return User.findOne({
          username,
          password,
        }).exec((findErr, user) => {
          if (findErr) {
            return res.status(500).send(findErr)
          }

          return res.send({
            user,
            loggedIn: true,
            status: 1,
          })
        })
      }
    )
  }

  static login(req: Request, res: Response) {
    const { username, password } = req.body

    // this is param checking if they are provided
    if (!username || !password) {
      return res.status(401).send({
        message: 'No field should be empty.',
      })
    }
    // check if the username matches any username
    return User.findOne({
      username,
    }).exec(async (err, user) => {
      if (err) {
        return res.status(500).send(err)
      }

      if (!user) {
        return res.status(401).send({
          message: 'User not found',
        })
      }

      // check password
      const isPasswordOK = await user.comparePassword(password)
      if (!isPasswordOK) {
        return res.status(401).send({
          message: 'Invalid password.',
        })
      }

      // save the date the token was generated for already inside toJSON()
      const token = jwt.sign({ username, password: user.password, _id: user._id }, 'secret key', {
        expiresIn: '30m', // 60 * 60 * 24, // expires in 24 hours
      })

      // return the token here
      return res.send({
        token,
      })
    })
  }

  static logout(req: Request, res: Response) {
    const auth = {
      loggedIn: false,
      status: 2,
      user: {},
    }

    return res.send(auth)
  }
}
