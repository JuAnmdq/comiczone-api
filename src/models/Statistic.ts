import { model, Schema, Document, Types } from 'mongoose'

export interface Statistic {
  value: number
  userId: Types.ObjectId | Record<string, unknown>
  comicId: Types.ObjectId | Record<string, unknown>
  createdOn: Date
}

export interface StatisticDocument extends Document, Statistic {}

const StatisticSchema = new Schema<StatisticDocument>({
  visited: Number,
  searches: Number,
  comic: {
    type: Schema.Types.ObjectId,
    ref: 'Comic',
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
})

export default model<StatisticDocument>('Statistic', StatisticSchema)
