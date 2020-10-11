import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
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

UserSchema.pre('save', async function encriptPassword(next) {
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

UserSchema.methods.comparePassword = async function compare(candidatePassword, cb) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw new Error('Error on checking password')
  }
}

export default mongoose.model('User', UserSchema)
