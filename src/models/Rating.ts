import { model, Schema, Document } from 'mongoose'

export interface Rating {
  value: number
  userId: Schema.Types.ObjectId | Record<string, unknown>
  comicId: Schema.Types.ObjectId | Record<string, unknown>
  createdOn: Date
}

export interface RatingDocument extends Document, Rating {}

const RatingSchema = new Schema<RatingDocument>({
  value: {
    type: Number,
    required: true,
  },
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
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

export default model<RatingDocument>('Rating', RatingSchema)
