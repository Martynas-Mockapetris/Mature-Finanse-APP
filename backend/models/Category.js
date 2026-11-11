import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense']
    },
    transactionRevision: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

categorySchema.index({ userId: 1, type: 1, name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export const Category = model('Category', categorySchema);
