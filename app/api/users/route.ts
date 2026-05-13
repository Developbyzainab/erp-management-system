import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

// GET - Fetch all users or single user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const result = await pool.query(
        `SELECT user_id, user_name, email, tenant_id, company_id, branch_id, 
                blocked, user_designation, emp_id, profile_image_url, creation_date
         FROM sys_users WHERE user_id = $1`,
        [id]
      );
      return NextResponse.json(result.rows[0] || null);
    }

    const result = await pool.query(
      `SELECT user_id, user_name, email, tenant_id, company_id, branch_id, 
              blocked, user_designation, emp_id, profile_image_url, creation_date
       FROM sys_users ORDER BY creation_date DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET Users Error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_name,
      email,
      password,
      tenant_id,
      company_id,
      branch_id,
      user_designation,
      emp_id
    } = body;

    // Validation
    if (!user_name || !email || !password || !tenant_id || !company_id || !branch_id) {
      return NextResponse.json(
        { error: 'Username, email, password, tenant, company and branch are required' },
        { status: 400 }
      );
    }

    // Check if username or email exists
    const existing = await pool.query(
      'SELECT user_id FROM sys_users WHERE user_name = $1 OR email = $2',
      [user_name, email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO sys_users (user_name, email, pwd, tenant_id, company_id, branch_id, 
                              user_designation, emp_id, blocked, creation_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'N', CURRENT_TIMESTAMP)
       RETURNING user_id, user_name, email`,
      [user_name, email, hashedPassword, tenant_id, company_id, branch_id, user_designation || null, emp_id || null]
    );

    return NextResponse.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('POST User Error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      user_id,
      user_name,
      email,
      tenant_id,
      company_id,
      branch_id,
      user_designation,
      emp_id,
      blocked
    } = body;

    if (!user_id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await pool.query(
      `UPDATE sys_users SET
        user_name = $1, email = $2, tenant_id = $3, company_id = $4, branch_id = $5,
        user_designation = $6, emp_id = $7, blocked = $8, last_update_date = CURRENT_TIMESTAMP
       WHERE user_id = $9`,
      [user_name, email, tenant_id, company_id, branch_id, user_designation || null, emp_id || null, blocked || 'N', user_id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT User Error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    await pool.query('DELETE FROM sys_users WHERE user_id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE User Error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}