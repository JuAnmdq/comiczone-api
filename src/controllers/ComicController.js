import ComicService from '../services/ComicService.js'

export default class ComicController {
  static async create(req, res) {
    try {
      const comic = await ComicService.createComic(req.body)
      res.status(201).json(comic)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async update(req, res) {
    try {
      const comic = await ComicService.updateComic(req.body, req.params.id)
      res.status(200).json(comic)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async delete(req, res) {
    try {
      const result = await ComicService.deleteComic(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async getById(req, res) {
    try {
      const comic = await ComicService.getComic(req.params.id)
      res.status(200).json(comic)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async getAll(req, res) {
    try {
      const comics = await ComicService.getComics(req.query)
      res.status(200).json(comics)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
