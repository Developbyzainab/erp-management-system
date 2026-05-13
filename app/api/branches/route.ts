import { NextRequest, NextResponse } from 'next/server';
import { getBranches, getBranch, createBranch, updateBranch, deleteBranch } from '@/app/branches/actions/branch';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (id) {
    const branch = await getBranch(id);
    return NextResponse.json(branch);
  }
  
  const branches = await getBranches();
  return NextResponse.json(branches);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  await createBranch(formData);
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData();
  const id = formData.get('id') as string;
  await updateBranch(id, formData);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (id) {
    await deleteBranch(id);
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: 'ID required' }, { status: 400 });
}