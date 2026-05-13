import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

// Temporary store for reset tokens (In production, use Redis)
const resetTokens = new Map<string, { email: string; expires: number }>();

export async function POST(request: NextRequest) {
  try {
    const { resetToken, newPassword } = await request.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json({ error: 'Reset token and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Get email from reset token
    const tokenData = resetTokens.get(resetToken);
    if (!tokenData || tokenData.expires < Date.now()) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    await pool.query(
      'UPDATE sys_users SET pwd = $1, last_update_date = CURRENT_TIMESTAMP WHERE email = $2',
      [hashedPassword, tokenData.email]
    );

    // Clean up
    resetTokens.delete(resetToken);
    
    return NextResponse.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}

// Helper to store reset token
export const storeResetToken = (email: string, token: string) => {
  resetTokens.set(token, {
    email,
    expires: Date.now() + 15 * 60 * 1000 // 15 minutes
  });
};