'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/layout/SessionProvider';
import { Mail, Lock, Eye, EyeOff, LogIn, Building2 } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await signIn(email, password);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl h-[550px] shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left Side - Form */}
        <div className="w-1/2 bg-white p-8 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-md mb-3">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="text-gray-500 text-xs mt-1">Sign in to access your dashboard</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 p-2.5 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-9 py-2 text-sm border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <div className="text-right mt-1">
                 <Link href="/forgot-password" className="text-xs text-red-600 hover:text-red-700">
  Forgot Password?
</Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogIn size={14} />
                )}
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center gap-3 my-4">
              <hr className="flex-1 border-gray-200" />
              <span className="text-[10px] text-gray-400">OR</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* Social Login */}
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                <span className="text-xs font-medium text-gray-600">Continue with Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300">
                <img src="https://www.svgrepo.com/show/448224/microsoft.svg" alt="Microsoft" className="w-4 h-4" />
                <span className="text-xs font-medium text-gray-600">Continue with Microsoft</span>
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link href="/signup" className="text-red-600 font-medium hover:text-red-700">
              Create Account
            </Link>
          </p>
        </div>

        {/* Right Side - Red Background */}
        <div className="w-1/2 bg-gradient-to-br from-red-600 to-red-700 relative overflow-hidden">
          {/* Pattern */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">ERP Nexus</h3>
            <p className="text-white/80 text-xs mb-6">Complete ERP Solution</p>
            
            <div className="space-y-2 text-left w-full">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-white/80">Multi-tenant Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-white/80">Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-white/80">Secure & Scalable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}