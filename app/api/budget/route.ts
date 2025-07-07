import { connectDB } from '@/lib/db';
import { Budget } from '@/lib/model/budget'; // Ensure you have this schema
import { NextResponse } from 'next/server';

 
export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find().sort({ createdAt: -1 });
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error("GET /api/budget error:", error);
    return NextResponse.json(
      { message: 'Failed to fetch budgets' },
      { status: 500 }
    );
  }
}

 
export async function POST(req: Request) {
  try {
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
    });

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error("POST /api/budget error:", error);
    return NextResponse.json(
      { message: 'Failed to create budget' },
      { status: 500 }
    );
  }
}
