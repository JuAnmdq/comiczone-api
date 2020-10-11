import jwt from 'jsonwebtoken'
import Comment from '../models/Comment.js'

export default class CommentController {
  static create(req, res) {
    jwt.verify(req.accessToken, 'secret key', (verifyErr, credentials) => {
      if (verifyErr) {
        return res.sendStatus(403)
      }

      const { content, comicId } = req.body
      const userId = credentials._id // get user profile by credential's data
      const body = {
        comicId,
        userId,
        content,
      }
      const comment = new Comment(body)

      return comment.save((saveErr, newComment) => {
        if (saveErr) {
          return res.send(saveErr)
        }

        return res.send({
          success: true,
        })
      })
    })
  }

  static delete(req, res) {
    Comment.remove({ _id: req.params.id }, err => {
      if (err) {
        return res.send(err)
      }

      return res.json({ message: 'Comment deleted successfully' })
    })
  }

  static getAll(req, res) {
    const populateUsers = {
      path: 'userId',
      model: 'User',
      select: {
        _id: 1,
        username: 1,
      },
    }

    const populateComics = {
      path: 'comicId',
      model: 'Comic',
      select: {
        _id: 1,
        title: 1,
      },
    }

    Comment.find({})
      .populate(populateUsers)
      .populate(populateComics)
      .exec((err, comments) => {
        if (err) {
          return res.send(err)
        }

        return res.json(comments)
      })
  }

  static getAllByComicId(req, res) {
    const query = {
      comicId: req.params.comicId, // get user profile by credential's data
    }

    const populateOptions = {
      path: 'userId',
      model: 'User',
    }

    Comment.find(query)
      .populate(populateOptions)
      .exec((err, comments) => {
        if (err) {
          return res.send(err)
        }

        return res.json(comments)
      })
  }
}
