// Temporary OTP storage (In production, use Redis)
const otpStore = new Map<string, { otp: string; expires: number }>();

export const saveOTP = (email: string, otp: string) => {
  otpStore.set(email, {
    otp,
    expires: Date.now() + 10 * 60 * 1000 // 10 minutes expiry
  });
};

export const verifyOTP = (email: string, otp: string): boolean => {
  const record = otpStore.get(email);
  if (!record) return false;
  if (record.expires < Date.now()) {
    otpStore.delete(email);
    return false;
  }
  if (record.otp !== otp) return false;
  otpStore.delete(email);
  return true;
};

export const deleteOTP = (email: string) => {
  otpStore.delete(email);
};