import { Schema, Document, models, model } from "mongoose";

export interface IBudget extends Document {
  category: string;
  amount: number;
  period: "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate?: string;
  spent: number;
  remaining: number;
  isActive: boolean;
  userId: string;  
  createdAt?: string;
  updatedAt?: string;
}

const BudgetSchema = new Schema<IBudget>(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    period: { type: String, enum: ["weekly", "monthly", "yearly"], required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    spent: { type: Number, default: 0 },
    remaining: {
      type: Number,
      default: function (this: IBudget) {
        return this.amount;
      },
    },
    isActive: { type: Boolean, default: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Budget = models.Budget || model<IBudget>("Budget", BudgetSchema);
