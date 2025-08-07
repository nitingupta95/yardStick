// app/api/budget/route.ts

import { connectDB } from '@/lib/db';
import { Budget } from '@/lib/model/budget';
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server"; // ✅ Correct import

// GET budgets for logged-in user
export async function GET() {
  try {
    const { userId } = await auth(); // ✅ AWAIT auth()

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const budgets = await Budget.find({ userId }).sort({ createdAt: -1 }); // ✅ userId filter
    return NextResponse.json(budgets, { status: 200 });

  } catch (error) {
    console.error("GET /api/budget error:", error);
    return NextResponse.json({ message: 'Failed to fetch budgets' }, { status: 500 });
  }
}

// POST new budget
export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // ✅ AWAIT auth()

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { category, amount, period, startDate, endDate } = body;

    if (!category || !amount || !period || !startDate) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newBudget = await Budget.create({
      category,
      amount,
      period,
      startDate,
      endDate,
      isActive: true,
      userId, // ✅ Save userId with entry
    });

    return NextResponse.json(newBudget, { status: 201 });

  } catch (error) {
    console.error("POST /api/budget error:", error);
    return NextResponse.json({ message: 'Failed to create budget' }, { status: 500 });
  }
}
