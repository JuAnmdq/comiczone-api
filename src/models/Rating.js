import mongoose from 'mongoose'

const RatingSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  comicId: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

export default mongoose.model('Rating', RatingSchema)
