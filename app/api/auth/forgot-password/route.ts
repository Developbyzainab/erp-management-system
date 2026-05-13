// import { NextRequest, NextResponse } from 'next/server';
// import pool from '@/lib/db';
// import { sendOTPEmail } from '@/lib/email';
// import { saveOTP } from '@/lib/otpStore';

// export async function POST(request: NextRequest) {
//   try {
//     const { email } = await request.json();

//     console.log('Forgot password request for:', email);

//     if (!email) {
//       return NextResponse.json({ error: 'Email is required' }, { status: 400 });
//     }

//     // Check if user exists
//     const result = await pool.query(
//       'SELECT user_id, user_name, email FROM sys_users WHERE email = $1',
//       [email]
//     );

//     console.log('User found:', result.rows.length);

//     if (result.rows.length === 0) {
//       // Don't reveal that email doesn't exist for security
//       return NextResponse.json({ success: true, message: 'If email exists, OTP will be sent' });
//     }

//     const user = result.rows[0];
    
//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
//     console.log(`Generated OTP for ${email}: ${otp}`);
    
//     // Save OTP
//     saveOTP(email, otp);
    
//     // Send email
//     try {
//       await sendOTPEmail(email, otp, user.user_name);
//       console.log('Email sent successfully');
//     } catch (emailError) {
//       console.error('Email sending failed:', emailError);
//       // Still return success but log error
//       return NextResponse.json({ 
//         success: true, 
//         message: 'OTP generated. Check console for OTP (Email not configured yet)',
//         otp: process.env.NODE_ENV === 'development' ? otp : undefined
//       });
//     }
    
//     return NextResponse.json({ success: true, message: 'OTP sent to your email' });
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     return NextResponse.json({ 
//       error: error instanceof Error ? error.message : 'Failed to process request' 
//     }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { saveOTP } from '@/lib/otpStore';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user exists
    const result = await pool.query(
      'SELECT user_id, user_name, email FROM sys_users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'If email exists, OTP will be sent' 
      });
    }

    const user = result.rows[0];
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP
    saveOTP(email, otp);
    
    // Return OTP in response for testing
    return NextResponse.json({ 
      success: true, 
      message: 'OTP generated successfully',
      otp: otp  // OTP screen par dikhega
    });
    
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ 
      error: 'Failed to process request' 
    }, { status: 500 });
  }
}