import express from 'express'
import bodyParser from 'body-parser'
import Statistic from '../models/Statistic.js'
import Comic from '../models/Comic.js'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

export default class StatisticController {
  static update(req, res) {
    const query = {
      comic: req.params.comicId,
    }

    const { statistic } = req.body
    if (!statistic) {
      return res.send(400)
    }

    const options = {
      $inc: { [statistic]: 1 },
    }

    return Statistic.findOneAndUpdate(query, options, { upsert: true, new: true }, (findStatErr, newStatistics) => {
      if (findStatErr) {
        return res.send(findStatErr)
      }

      const statisticQuery = {
        $set: { statistics: newStatistics._id },
      }

      return Comic.findByIdAndUpdate(req.params.comicId, statisticQuery, (findErr, newComic) => {
        if (findErr) {
          return res.send(findErr)
        }

        return res.json(newStatistics)
      })
    })
  }

  static getAll(req, res) {
    Statistic.find({}, (err, statistics) => {
      if (err) {
        return res.send(err)
      }

      return res.json(statistics)
    })
  }
}
