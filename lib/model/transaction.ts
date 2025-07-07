import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ITransaction extends Document {
  _id: mongoose.Types.ObjectId;  
  amount: number;
  description: string;
  date: string;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

 
export const Transaction =
  models.Transaction || model<ITransaction>('Transaction', TransactionSchema);
