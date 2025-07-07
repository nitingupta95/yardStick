// app/api/transaction/route.ts or route.js

import { connectDB } from '@/lib/db';
import { Transaction } from '@/lib/model/transaction';
import { NextResponse } from 'next/server';

// GET all transactions (sorted by newest first)
export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error('GET /api/transaction error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

 



export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("Received body:", body);

    if (
      typeof body.amount !== 'number' ||
      body.amount <= 0 ||
      !body.description?.trim() ||
      !body.date?.trim()
    ) {
      return NextResponse.json(
        { message: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    const transaction = await Transaction.create(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('POST /api/transaction error:', error);
    return NextResponse.json(
      { message: 'Failed to add transaction' },
      { status: 500 }
    );
  }
}

