import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Loan from '../models/Loan'
import { Credentials, VerifyRequest } from '../types'

export default class LoanController {
  static create(req: Request, res: Response) {
    const { userId, comicId } = req.body
    const createdOn = new Date()
    const dueDate = new Date(createdOn.getTime())
    dueDate.setHours(dueDate.getHours() + 48)
    const model = {
      userId,
      comicId,
      dueDate,
    }
    const loan = new Loan(model)

    loan.save(err => {
      if (err) {
        return res.send(err)
      }

      return res.json({ message: 'Loan added successfully' })
    })
  }

  static getById(req: Request, res: Response) {
    Loan.findById(req.params.id, (err, loan) => {
      if (err) {
        return res.send(err)
      }
      return res.json(loan)
    })
  }

  static getAll(req: Request, res: Response) {
    Loan.find({}, (err, loans) => {
      if (err) {
        return res.send(err)
      }

      return res.json(loans)
    })
  }

  static getCurrents(req: Request, res: Response) {
    const query = {
      dueDate: {
        $gte: new Date(),
      },
    }

    Loan.find(query, (err, loans) => {
      if (err) {
        return res.send(err)
      }

      return res.json(loans)
    })
  }

  static getHistorical(req: VerifyRequest, res: Response) {
    jwt.verify(String(req.accessToken), 'secret key', (verifyErr, credentials: Credentials | object | undefined) => {
      if (verifyErr) {
        return res.sendStatus(403)
      }

      const { _id: userId } = credentials as Credentials // get user profile by credential's data

      const query: any = {
        userId,
      }

      const populateOptions = {
        path: 'comicId',
        model: 'Comic',
      }

      return Loan.find(query)
        .populate(populateOptions)
        .exec((findErr, loans) => {
          if (findErr) {
            return res.send(findErr)
          }

          const history = loans.map(loan => ({
            _id: loan._id,
            userId: loan.userId,
            dueDate: loan.dueDate,
            createdOn: loan.createdOn,
            comic: loan.comicId,
          }))

          const currents = history.filter(loan => loan.dueDate >= new Date())

          const response = {
            currents,
            history,
          }

          return res.json(response)
        })
    })
  }
}
