import jwt from 'jsonwebtoken'
import Loan from '../models/Loan.js'

export default class LoanController {
  static create(req, res) {
    const { userId, comicId } = req.body
    const createdOn = new Date()
    const dueDate = new Date(createdOn.getTime())
    dueDate.setHours(dueDate.getHours() + 48)
    const model = {
      userId,
      comicId,
      dueDate,
    }
    const loan = new Loan(model, createdOn)

    loan.save(err => {
      if (err) {
        return res.send(err)
      }

      return res.json({ message: 'Loan added successfully' })
    })
  }

  static getById(req, res) {
    Loan.findById(req.params.id, (err, loan) => {
      if (err) {
        return res.send(err)
      }
      return res.json(loan)
    })
  }

  static getAll(req, res) {
    Loan.find({}, (err, loans) => {
      if (err) {
        return res.send(err)
      }

      return res.json(loans)
    })
  }

  static getCurrents(req, res) {
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

  static getHistorical(req, res) {
    jwt.verify(req.accessToken, 'secret key', (verifyErr, credentials) => {
      if (verifyErr) {
        return res.sendStatus(403)
      }
      const query = {
        userId: credentials._id, // get user profile by credential's data
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
