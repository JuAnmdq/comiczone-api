import { model, Schema, Document, Types } from 'mongoose'

export interface Loan {
  userId: Types.ObjectId | Record<string, unknown>
  comicId: Types.ObjectId | Record<string, unknown>
  dueDate: Date
  createdOn: Date
}

export interface LoanDocument extends Document, Loan {}

const LoanSchema = new Schema<LoanDocument>({
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

export default model<LoanDocument>('Loan', LoanSchema)
