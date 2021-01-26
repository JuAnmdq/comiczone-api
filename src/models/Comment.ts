import { model, Schema, Document, Types } from 'mongoose'

export interface Comment {
  userId: Types.ObjectId | Record<string, unknown>
  comicId: Types.ObjectId | Record<string, unknown>
  content: string
  createdOn: Date
}

export interface CommentDocument extends Document, Comment {}

const CommentSchema = new Schema<CommentDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comicId: {
    type: Schema.Types.ObjectId,
    ref: 'Comic',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
    required: true,
  },
})

export default model<CommentDocument>('Comment', CommentSchema)
