import { Document, Model, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface User {
  username: string
  email: string
  password: string
  profile: string
  firstName?: string
  lastName?: string
  createdOn: Date
}

export interface UserDocument extends User, Document {
  comparePassword(candidatePassword: string): any
}

export interface UserModel extends Model<UserDocument> {
  comparePassword(candidatePassword: string): any
}

const UserSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
})

UserSchema.pre<UserDocument>('save', async function encriptPassword(next) {
  try {
    // if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    // }

    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.comparePassword = async function compare(candidatePassword: string) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw new Error('Error on checking password')
  }
}

export default model<UserDocument, UserModel>('User', UserSchema)
