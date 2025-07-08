import { connectDB } from '@/lib/db';
import { Budget } from '@/lib/model/budget';
import { NextResponse } from 'next/server';
 

export async function PUT(req: Request,  { params }: { params: Promise<{ id: string }>}) {
  await connectDB();

  try {
    const id = (await params).id; 
    const body = await req.json();

    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedBudget) {
      return NextResponse.json({ message: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    console.error('PUT /api/budget/[id] error:', error);
    return NextResponse.json({ message: 'Failed to update budget' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }>}) {
  await connectDB();
   const id = (await params).id; 

  const deleted = await Budget.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: 'Budget not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Budget deleted successfully' }, { status: 200 });
}
