import { connectDB } from '@/lib/db';
import { Transaction } from '@/lib/model/transaction';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// GET /api/transaction
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("GET /api/transaction error:", error);
    return NextResponse.json({ message: 'Failed to fetch transactions' }, { status: 500 });
  }
}
 


export async function POST(req: Request) {
  const { userId } = await auth();  

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const { amount, description, date, category } = body;

    
    if (
      typeof amount !== 'number' ||
      amount <= 0 ||
      typeof description !== 'string' ||
      description.trim() === '' ||
      typeof date !== 'string' ||
      date.trim() === ''
    ) {
      return NextResponse.json(
        { message: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    // ✅ Save the transaction
    const transaction = await Transaction.create({
      amount,
      description,
      date,
      category,
      userId,
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('POST /api/transaction error:', error);
    return NextResponse.json(
      { message: 'Failed to add transaction' },
      { status: 500 }
    );
  }
}