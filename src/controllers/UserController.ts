import { Request, Response } from 'express'
import UserService from '../services/UserService'

export default class UserController {
  static async create(req: Request, res: Response) {
    try {
      const { body } = req
      const response = await UserService.createUser(body)
      res.status(201).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { body, params } = req
      const response = await UserService.updateUser(body, params.id)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const response = await UserService.deleteUser(id)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async userExists(req: Request, res: Response) {
    try {
      const { username } = req.params
      const response = await UserService.userExists(username)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async emailExists(req: Request, res: Response) {
    try {
      const { email } = req.params
      const response = await UserService.emailExists(email)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const response = await UserService.getUser(id)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const response = await UserService.getUsers()
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
