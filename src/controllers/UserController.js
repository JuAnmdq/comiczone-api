import UserService from '../services/UserService.js'

export default class UserController {
  static async create(req, res) {
    try {
      const { body } = req
      const response = await UserService.createUser(body)
      req.status(201).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async update(req, res) {
    try {
      const { body, params } = req
      const response = await UserService.updateUser(body, params.id)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      const response = await UserService.deleteUser(id)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async userExists(req, res) {
    try {
      const { username } = req.params
      const response = await UserService.userExists(username)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async emailExists(req, res) {
    try {
      const { email } = req.params
      const response = await UserService.emailExists(email)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params
      const response = await UserService.getUser(id)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async getAll(req, res) {
    try {
      const response = await UserService.getUsers()
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
