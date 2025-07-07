import { connectDB } from '@/lib/db';
import { Budget } from '@/lib/model/budget';
import { NextResponse } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}


 

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    // Directly use params.id - no await needed
    const deletedBudget = await Budget.findByIdAndDelete(params.id);

    if (!deletedBudget) {
      return NextResponse.json(
        { message: 'Budget not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Budget deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/budget/[id] error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

 
 
 
export async function PUT(req: Request, { params }: Params) {
  await connectDB();

  try {
    const body = await req.json();

    const updatedBudget = await Budget.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedBudget) {
      return NextResponse.json({ message: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    console.error('PUT /api/budgets/[id] error:', error);
    return NextResponse.json({ message: 'Failed to update budget' }, { status: 500 });
  }
}
