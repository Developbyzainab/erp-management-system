'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/layout/SessionProvider';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Building2, Briefcase, Store, ChevronDown } from 'lucide-react';

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tenant_id: '',
    company_id: '',
    branch_id: ''
  });

  const [tenants, setTenants] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [loadingTenants, setLoadingTenants] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [loadingBranches, setLoadingBranches] = useState(false);

  // Fetch tenants on page load
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setLoadingTenants(true);
        const res = await fetch('/api/tenants');
        const data = await res.json();
        setTenants(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching tenants:', err);
        setTenants([]);
      } finally {
        setLoadingTenants(false);
      }
    };
    fetchTenants();
  }, []);

  // Fetch all companies on page load
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const res = await fetch('/api/company');
        const data = await res.json();
        setCompanies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setCompanies([]);
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch all branches on page load
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoadingBranches(true);
        const res = await fetch('/api/branches');
        const data = await res.json();
        setBranches(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching branches:', err);
        setBranches([]);
      } finally {
        setLoadingBranches(false);
      }
    };
    fetchBranches();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.user_name.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (!formData.tenant_id) {
      setError('Please select a Tenant');
      setLoading(false);
      return;
    }

    if (!formData.company_id) {
      setError('Please select a Company');
      setLoading(false);
      return;
    }

    if (!formData.branch_id) {
      setError('Please select a Branch');
      setLoading(false);
      return;
    }

    const result = await signUp(
      formData.user_name,
      formData.email,
      formData.password,
      parseInt(formData.tenant_id),
      parseInt(formData.company_id),
      parseInt(formData.branch_id)
    );

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Failed to create account');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Main Container - No overflow on left side */}
      <div className="flex w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden" style={{ height: 'auto', minHeight: '580px' }}>
        
        {/* Left Side - Form (No scroll bar) */}
        <div className="w-1/2 bg-white">
          <div className="p-5">
            {/* Logo */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-md mb-2">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-base font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-500 text-[11px] mt-0.5">Get started with ERP Nexus</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-3 p-2 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              {/* Username */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Username <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                  <input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Tenant Dropdown */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Tenant <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={13} />
                  <select
                    name="tenant_id"
                    value={formData.tenant_id}
                    onChange={handleChange}
                    className="w-full pl-9 pr-7 py-1.5 text-xs border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-white cursor-pointer appearance-none"
                    required
                  >
                    <option value="">-- Select Tenant --</option>
                    {loadingTenants ? (
                      <option disabled>Loading...</option>
                    ) : (
                      tenants.map((t: any) => (
                        <option key={t.id} value={t.id}>{t.tenant_name}</option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                </div>
              </div>

              {/* Company Dropdown */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Company <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={13} />
                  <select
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleChange}
                    className="w-full pl-9 pr-7 py-1.5 text-xs border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-white cursor-pointer appearance-none"
                    required
                  >
                    <option value="">-- Select Company --</option>
                    {loadingCompanies ? (
                      <option disabled>Loading...</option>
                    ) : (
                      companies.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.company_name}</option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                </div>
              </div>

              {/* Branch Dropdown */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Branch <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={13} />
                  <select
                    name="branch_id"
                    value={formData.branch_id}
                    onChange={handleChange}
                    className="w-full pl-9 pr-7 py-1.5 text-xs border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-white cursor-pointer appearance-none"
                    required
                  >
                    <option value="">-- Select Branch --</option>
                    {loadingBranches ? (
                      <option disabled>Loading...</option>
                    ) : (
                      branches.map((b: any) => (
                        <option key={b.id} value={b.id}>{b.branch_name}</option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password (min 6 characters)"
                    className="w-full pl-9 pr-8 py-1.5 text-xs border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                  >
                    {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Confirm Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full pl-9 pr-8 py-1.5 text-xs border border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                  >
                    {showConfirmPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-1.5 rounded-lg text-xs font-medium transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-1.5 mt-1"
              >
                {loading ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UserPlus size={12} />
                )}
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-5 pt-3 border-t border-gray-100">
              <p className="text-center text-[11px] text-gray-500">
                Already have an account?{' '}
                <Link href="/signin" className="text-red-600 font-medium hover:text-red-700">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Red Background */}
        <div className="w-1/2 bg-gradient-to-br from-red-600 to-red-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative h-full flex flex-col items-center justify-center p-4 text-center text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2 backdrop-blur-sm">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-bold mb-1">ERP Nexus</h3>
            <p className="text-white/80 text-[11px] mb-4">Complete ERP Solution</p>
            
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[11px] text-white/80">Multi-tenant Architecture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[11px] text-white/80">Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[11px] text-white/80">Secure & Scalable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}