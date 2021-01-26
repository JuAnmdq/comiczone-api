import bcrypt from 'bcryptjs'
import User, { User as IUser, UserDocument } from '../models/User'

async function createUser(userPayload: IUser) {
  try {
    const user = new User(userPayload)
    await user.save()
    return {
      message: 'User added successfully',
    }
  } catch (error) {
    throw new Error(`Connot create user: ${error}`)
  }
}

async function updateUser(nextUser: UserDocument, id: string) {
  try {
    const salt = await bcrypt.genSalt(10)
    nextUser.password = await bcrypt.hash(nextUser.password, salt)
    const updatedUser = await User.findOneAndUpdate({ _id: id }, nextUser)

    return {
      message: 'User updated successfully',
      updatedUser,
    }
  } catch (error) {
    throw new Error(`Cannot update user: ${error}`)
  }
}

async function deleteUser(id: string) {
  try {
    await User.deleteOne({ _id: id })

    return {
      message: 'User deleted successfully',
    }
  } catch (error) {
    throw new Error(`Cannot delete user: ${error}`)
  }
}

async function userExists(username: string) {
  try {
    const counter = await User.count({ username })
    return counter > 0
  } catch (error) {
    throw new Error(`Cannot check if username exists: ${error}`)
  }
}

async function emailExists(email: string) {
  try {
    const counter = await User.count({ email })
    return counter > 0
  } catch (error) {
    throw new Error(`Cannot check if email exists: ${error}`)
  }
}

async function getUser(id: string) {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    throw new Error(`Cannot find user with id ${id}: ${error}`)
  }
}

async function getUsers() {
  try {
    const users = await User.find({})
    return users
  } catch (error) {
    throw new Error(`Cannot find users: ${error}`)
  }
}

export default {
  createUser,
  updateUser,
  deleteUser,
  userExists,
  emailExists,
  getUser,
  getUsers,
}
