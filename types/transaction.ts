export type Transaction = {
   
  amount: number;
  description: string;
  date: string;
  category?: string;
};

export type TransactionFormData = Omit<Transaction, '_id'>;

export const TRANSACTION_CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Bills & Utilities',
  'Entertainment',
  'Healthcare',
  'Education',
  'Travel',
  'Income',
  'Other',
] as const;

export type TransactionCategory = typeof TRANSACTION_CATEGORIES[number];