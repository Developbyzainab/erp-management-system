// import { NextRequest, NextResponse } from 'next/server';
// import pool from '@/lib/db';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { user_name, email, password, tenant_id, company_id, branch_id } = body;

//     console.log('Signup attempt for:', email);

//     // Validation
//     if (!user_name || !email || !password) {
//       return NextResponse.json(
//         { error: 'Username, email and password are required' },
//         { status: 400 }
//       );
//     }

//     if (!tenant_id || !company_id || !branch_id) {
//       return NextResponse.json(
//         { error: 'Tenant ID, Company ID and Branch ID are required' },
//         { status: 400 }
//       );
//     }

//     // Check if username already exists
//     const existingUser = await pool.query(
//       'SELECT user_id FROM sys_users WHERE user_name = $1 OR email = $2',
//       [user_name, email]
//     );

//     if (existingUser.rows.length > 0) {
//       return NextResponse.json(
//         { error: 'Username or email already registered' },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const bcrypt = await import('bcryptjs');
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user (user_id auto-generates because of BIGSERIAL)
//     const result = await pool.query(
//       `INSERT INTO sys_users (
//         user_name, email, pwd, tenant_id, company_id, branch_id,
//         blocked, creation_date
//       ) VALUES ($1, $2, $3, $4, $5, $6, 'N', CURRENT_TIMESTAMP)
//       RETURNING user_id, user_name, email`,
//       [user_name, email, hashedPassword, tenant_id, company_id, branch_id]
//     );

//     const newUser = result.rows[0];
//     console.log('User created successfully:', newUser.user_id);

//     return NextResponse.json({
//       success: true,
//       message: 'User created successfully',
//       user: newUser
//     });
//   } catch (error) {
//     console.error('Signup error details:', error);
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_name, email, password, tenant_id, company_id, branch_id } = body;

    console.log('Signup attempt for:', email);

    // Validation
    if (!user_name || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email and password are required' },
        { status: 400 }
      );
    }

    if (!tenant_id || !company_id || !branch_id) {
      return NextResponse.json(
        { error: 'Tenant ID, Company ID and Branch ID are required' },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existingUser = await pool.query(
      'SELECT user_id FROM sys_users WHERE user_name = $1 OR email = $2',
      [user_name, email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Username or email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user (user_id auto-generates because of BIGSERIAL)
    const result = await pool.query(
      `INSERT INTO sys_users (
        user_name, email, pwd, tenant_id, company_id, branch_id,
        blocked, creation_date
      ) VALUES ($1, $2, $3, $4, $5, $6, 'N', CURRENT_TIMESTAMP)
      RETURNING user_id, user_name, email`,
      [user_name, email, hashedPassword, tenant_id, company_id, branch_id]
    );

    const newUser = result.rows[0];
    console.log('User created successfully:', newUser.user_id);

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Signup error details:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}