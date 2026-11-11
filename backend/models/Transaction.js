import { Schema, model } from 'mongoose';

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense']
    },
    categoryId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: Number.MIN_VALUE,
      validate: {
        validator: Number.isFinite,
        message: 'Amount must be a finite number.'
      }
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/
    },
    note: {
      type: String,
      default: '',
      trim: true
    }
  },
  { timestamps: true }
);

export const Transaction = model('Transaction', transactionSchema);
