// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [resetToken, setResetToken] = useState('');
//   const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSendOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const res = await fetch('/api/auth/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });
      
//       const data = await res.json();
      
//       if (res.ok && data.success) {
//         setSuccess('OTP sent to your email!');
//         setStep(2);
//       } else {
//         setError(data.error || 'Failed to send OTP');
//       }
//     } catch (err) {
//       setError('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const res = await fetch('/api/auth/verify-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp })
//       });
      
//       const data = await res.json();
      
//       if (res.ok && data.success) {
//         setResetToken(data.resetToken);
//         setSuccess('OTP verified! Set your new password');
//         setStep(3);
//       } else {
//         setError(data.error || 'Invalid OTP');
//       }
//     } catch (err) {
//       setError('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }
    
//     if (newPassword.length < 6) {
//       setError('Password must be at least 6 characters');
//       setLoading(false);
//       return;
//     }
    
//     try {
//       const res = await fetch('/api/auth/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ resetToken, newPassword })
//       });
      
//       const data = await res.json();
      
//       if (res.ok && data.success) {
//         setSuccess('Password reset successfully! Redirecting to login...');
//         setTimeout(() => {
//           window.location.href = '/signin';
//         }, 2000);
//       } else {
//         setError(data.error || 'Failed to reset password');
//       }
//     } catch (err) {
//       setError('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-600" />
          
//           <div className="p-6">
//             {/* Header */}
//             <div className="text-center mb-6">
//               <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-md mb-3">
//                 <Mail className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-xl font-bold text-gray-800">
//                 {step === 1 && 'Forgot Password'}
//                 {step === 2 && 'Enter OTP'}
//                 {step === 3 && 'Set New Password'}
//               </h2>
//               <p className="text-gray-500 text-xs mt-1">
//                 {step === 1 && 'Enter your email to receive OTP'}
//                 {step === 2 && 'Enter the 6-digit code sent to your email'}
//                 {step === 3 && 'Create a new password for your account'}
//               </p>
//             </div>

//             {/* Success Message */}
//             {success && (
//               <div className="mb-4 p-2.5 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-center gap-2">
//                 <CheckCircle size={16} className="text-green-600" />
//                 <p className="text-xs text-green-700">{success}</p>
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div className="mb-4 p-2.5 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-2">
//                 <AlertCircle size={16} className="text-red-600" />
//                 <p className="text-xs text-red-700">{error}</p>
//               </div>
//             )}

//             {/* Step 1: Email Form */}
//             {step === 1 && (
//               <form onSubmit={handleSendOTP} className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your registered email"
//                       className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
//                 >
//                   {loading ? <Loader2 size={16} className="animate-spin" /> : null}
//                   {loading ? 'Sending OTP...' : 'Send OTP'}
//                 </button>
//               </form>
//             )}

//             {/* Step 2: OTP Form */}
//             {step === 2 && (
//               <form onSubmit={handleVerifyOTP} className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">OTP Code</label>
//                   <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     placeholder="Enter 6-digit OTP"
//                     maxLength={6}
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-center text-lg font-bold tracking-widest"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
//                 >
//                   {loading ? <Loader2 size={16} className="animate-spin" /> : null}
//                   {loading ? 'Verifying...' : 'Verify OTP'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setStep(1)}
//                   className="w-full text-center text-xs text-gray-500 hover:text-red-600 transition"
//                 >
//                   ← Back to email
//                 </button>
//               </form>
//             )}

//             {/* Step 3: New Password Form */}
//             {step === 3 && (
//               <form onSubmit={handleResetPassword} className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
//                   <input
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     placeholder="Enter new password (min 6 characters)"
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm your new password"
//                     className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
//                 >
//                   {loading ? <Loader2 size={16} className="animate-spin" /> : null}
//                   {loading ? 'Resetting...' : 'Reset Password'}
//                 </button>
//               </form>
//             )}

//             {/* Back to Login */}
//             <div className="text-center mt-4">
//               <Link href="/signin" className="text-xs text-gray-500 hover:text-red-600 transition flex items-center justify-center gap-1">
//                 <ArrowLeft size={12} />
//                 Back to Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1: Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        if (data.otp) {
          setSuccess(`🔐 Your OTP is: ${data.otp} (Use this code to reset password)`);
        } else {
          setSuccess('OTP sent to your email!');
        }
        setStep(2);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setResetToken(data.resetToken);
        setSuccess('OTP verified! Set your new password');
        setStep(3);
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/signin';
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        if (data.otp) {
          setSuccess(`🔐 New OTP sent: ${data.otp}`);
        } else {
          setSuccess('New OTP sent to your email!');
        }
      } else {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-600" />
          
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-md mb-3">
                {step === 1 && <Mail className="w-6 h-6 text-white" />}
                {step === 2 && <CheckCircle className="w-6 h-6 text-white" />}
                {step === 3 && <Lock className="w-6 h-6 text-white" />}
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {step === 1 && 'Forgot Password'}
                {step === 2 && 'Enter OTP'}
                {step === 3 && 'Set New Password'}
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                {step === 1 && 'Enter your email to receive OTP'}
                {step === 2 && 'Enter the 6-digit code sent to your email'}
                {step === 3 && 'Create a new password for your account'}
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                <p className="text-xs text-green-700">{success}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            {/* Step 1: Email Form */}
            {step === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            )}

            {/* Step 2: OTP Form */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OTP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-center text-xl font-bold tracking-widest"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    Enter the 6-digit code
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-xs text-red-600 hover:text-red-700 font-medium transition"
                  >
                    Resend OTP
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs text-gray-500 hover:text-red-600 transition flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={12} />
                  Back to email
                </button>
              </form>
            )}

            {/* Step 3: New Password Form */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 6 characters)"
                      className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs text-gray-500 hover:text-red-600 transition flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={12} />
                  Back to login
                </button>
              </form>
            )}

            {/* Back to Login Link */}
            <div className="text-center mt-4 pt-3 border-t border-gray-100">
              <Link href="/signin" className="text-xs text-gray-500 hover:text-red-600 transition flex items-center justify-center gap-1">
                <ArrowLeft size={12} />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}