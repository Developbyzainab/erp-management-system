import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_change_this';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    
    const result = await pool.query(
      `SELECT 
        user_id, user_name, email, tenant_id, company_id, branch_id,
        blocked, user_designation, emp_id, profile_image_url
       FROM sys_users 
       WHERE user_id = $1 AND blocked = 'N'`,
      [decoded.user_id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ user: null });
  }
}