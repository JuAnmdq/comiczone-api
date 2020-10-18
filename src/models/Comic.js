import mongoose from 'mongoose'

const ComicSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating',
    },
  ],
  statistics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Statistic',
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model('Comic', ComicSchema)
