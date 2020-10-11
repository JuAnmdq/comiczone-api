import mongoose from 'mongoose'

const StatisticSchema = new mongoose.Schema({
  visited: Number,
  searches: Number,
  comic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comic',
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model('Statistic', StatisticSchema)
