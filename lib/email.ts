import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: string, userName: string) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 20px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { padding: 30px; text-align: center; }
        .otp-code { font-size: 32px; font-weight: bold; color: #dc2626; letter-spacing: 5px; background: #fef2f2; padding: 15px; border-radius: 8px; display: inline-block; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #6c757d; }
        .button { background: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 ERP Nexus</h1>
        </div>
        <div class="content">
          <h2>Password Reset Request</h2>
          <p>Hello <strong>${userName}</strong>,</p>
          <p>You requested to reset your password. Use the OTP below to verify your identity:</p>
          <div class="otp-code">${otp}</div>
          <p>This OTP is valid for <strong>10 minutes</strong>.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ERP Nexus. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"ERP Nexus" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset OTP - ERP Nexus',
    html,
  });
};