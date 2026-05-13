import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_change_this';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Signin attempt for:', email);

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const result = await pool.query(
      `SELECT 
        user_id, user_name, email, pwd, tenant_id, company_id, branch_id,
        blocked, user_designation, emp_id
       FROM sys_users 
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Check if user is blocked
    if (user.blocked === 'Y') {
      return NextResponse.json(
        { error: 'Your account is blocked. Please contact administrator.' },
        { status: 403 }
      );
    }

    // Verify password
    const bcrypt = await import('bcryptjs');
    const isValid = await bcrypt.compare(password, user.pwd);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create token
    const token = jwt.sign(
      { 
        user_id: user.user_id, 
        user_name: user.user_name,
        email: user.email,
        tenant_id: user.tenant_id,
        company_id: user.company_id,
        branch_id: user.branch_id
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie and return response
    const response = NextResponse.json({
      success: true,
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        tenant_id: user.tenant_id,
        company_id: user.company_id,
        branch_id: user.branch_id,
        user_designation: user.user_designation,
        emp_id: user.emp_id
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    console.log('User signed in successfully:', user.user_id);

    return response;
  } catch (error) {
    console.error('Signin error details:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}