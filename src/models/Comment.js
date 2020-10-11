import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comic',
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model('Comment', CommentSchema)
