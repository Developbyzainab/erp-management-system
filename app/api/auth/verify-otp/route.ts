import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otpStore';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    const isValid = verifyOTP(email, otp);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Create a temporary token for password reset
    const resetToken = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    return NextResponse.json({ 
      success: true, 
      resetToken,
      message: 'OTP verified successfully' 
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}