import { NextRequest, NextResponse } from 'next/server';
import { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment } from '@/app/departments/actions/department';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (id) {
    const department = await getDepartment(id);
    return NextResponse.json(department);
  }
  
  const departments = await getDepartments();
  return NextResponse.json(departments);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  await createDepartment(formData);
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData();
  const id = formData.get('id') as string;
  await updateDepartment(id, formData);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (id) {
    await deleteDepartment(id);
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: 'ID required' }, { status: 400 });
}