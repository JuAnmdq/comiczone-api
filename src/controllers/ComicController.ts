import { Request, Response } from 'express'
import ComicService from '../services/ComicService'

export default class ComicController {
  static async create(req: Request, res: Response) {
    try {
      const comic = await ComicService.createComic(req.body)
      res.status(201).json({
        message: 'Comic has been added successfully',
        comic,
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const comic = await ComicService.updateComic(req.body, req.params.id)
      res.status(200).json({
        message: 'Comic has been updated successfully',
        comic,
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await ComicService.deleteComic(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const comic = await ComicService.getComic(req.params.id)
      res.status(200).json(comic)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const comics = await ComicService.getComics(req.query)
      res.status(200).json(comics)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
