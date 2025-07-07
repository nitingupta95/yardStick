 
import { connectDB } from '@/lib/db';
import { Transaction } from "../../../../lib/model/transaction";
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';

interface Params {
  params: { id: string };
}

 
export async function GET(_: Request, { params }: Params) {
  await connectDB();
  const transaction = await Transaction.findById(params.id);
  if (!transaction) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  return NextResponse.json(transaction);
}

 
export async function PUT(req: Request, { params }: Params) {
  await connectDB();
  const body = await req.json();

  if (!Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const updated = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

 
export async function DELETE(_: Request, { params }: Params) {
  await connectDB();

  if (!Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  await Transaction.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
