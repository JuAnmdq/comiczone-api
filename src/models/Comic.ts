import { model, Schema, Document, Types } from 'mongoose'

export interface Comic {
  title: string
  description?: string
  genre?: String
  releaseDate?: String
  publisher?: string
  creator?: string
  edition?: string
  specialEdition?: string
  character?: string
  promoImage?: string
  recommend?: number
  searches?: number
  loans?: number
  popular?: boolean
  comments?: any[] // @review this data also in schema
  ratings?: Types.ObjectId[] | Record<string, unknown>[]
  statistics?: Types.ObjectId | Record<string, unknown>
  createdOn: Date
}

export interface ComicDocument extends Comic, Document {}

const ComicSchema = new Schema<ComicDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: String,
  genre: String,
  releaseDate: Date,
  publisher: String,
  creator: String,
  edition: String,
  specialEdition: Boolean,
  character: String,
  promoImage: String,
  recommend: Number,
  searches: Number,
  loans: Number,
  popular: Boolean,
  comments: Array,
  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Rating',
    },
  ],
  statistics: {
    type: Schema.Types.ObjectId,
    ref: 'Statistic',
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
})

export default model<ComicDocument>('Comic', ComicSchema)
