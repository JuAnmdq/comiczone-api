import mongoose from 'mongoose'

const LoanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  comicId: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

export default mongoose.model('Loan', LoanSchema)
