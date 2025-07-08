import { connectDB } from '@/lib/db';
import { Transaction } from "@/lib/model/transaction";
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }>}) {
  await connectDB();
  const id = (await params).id; 

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const transaction = await Transaction.findById(id);
  if (!transaction) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  return NextResponse.json(transaction);
}

export async function PUT(req: Request,{ params }: { params: Promise<{ id: string }>}) {
  await connectDB();
  const id = (await params).id; 
  const body = await req.json();

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const updated = await Transaction.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }>}) {
  await connectDB();
  const id = (await params).id; 

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
