'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Save, User, Mail, Lock, Loader2, 
  CheckCircle, AlertCircle, Building2, Briefcase, Store,
  Hash, Users, Eye, EyeOff
} from 'lucide-react';

interface UserFormProps {
  mode: 'create' | 'edit' | 'view';
  userId?: string;
}

export default function UserForm({ mode, userId }: UserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(mode === 'edit' || mode === 'view');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [tenants, setTenants] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    tenant_id: '',
    company_id: '',
    branch_id: '',
    user_designation: '',
    emp_id: '',
    blocked: 'N'
  });

  // Fetch tenants
  useEffect(() => {
    fetch('/api/tenants')
      .then(res => res.json())
      .then(data => setTenants(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching tenants:', err));
  }, []);

  // Fetch companies when tenant changes
  useEffect(() => {
    if (formData.tenant_id) {
      fetch(`/api/company?tenant_id=${formData.tenant_id}`)
        .then(res => res.json())
        .then(data => setCompanies(Array.isArray(data) ? data : []))
        .catch(err => console.error('Error fetching companies:', err));
    }
  }, [formData.tenant_id]);

  // Fetch branches when company changes
  useEffect(() => {
    if (formData.company_id) {
      fetch(`/api/branches?company_id=${formData.company_id}`)
        .then(res => res.json())
        .then(data => setBranches(Array.isArray(data) ? data : []))
        .catch(err => console.error('Error fetching branches:', err));
    }
  }, [formData.company_id]);

  // Fetch user data for edit/view mode
  useEffect(() => {
    const fetchUser = async () => {
      if ((mode === 'edit' || mode === 'view') && userId) {
        try {
          setLoadingData(true);
          const res = await fetch(`/api/users?id=${userId}`);
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          setFormData({
            user_name: data.user_name || '',
            email: data.email || '',
            password: '',
            tenant_id: data.tenant_id || '',
            company_id: data.company_id || '',
            branch_id: data.branch_id || '',
            user_designation: data.user_designation || '',
            emp_id: data.emp_id || '',
            blocked: data.blocked || 'N'
          });
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoadingData(false);
        }
      } else {
        setLoadingData(false);
      }
    };
    fetchUser();
  }, [mode, userId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.user_name.trim()) newErrors.user_name = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (mode === 'create' && !formData.password) newErrors.password = 'Password is required';
    if (mode === 'create' && formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.tenant_id) newErrors.tenant_id = 'Tenant is required';
    if (!formData.company_id) newErrors.company_id = 'Company is required';
    if (!formData.branch_id) newErrors.branch_id = 'Branch is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess(false);

    try {
      const payload: any = {
        user_name: formData.user_name,
        email: formData.email,
        tenant_id: parseInt(formData.tenant_id),
        company_id: parseInt(formData.company_id),
        branch_id: parseInt(formData.branch_id),
        user_designation: formData.user_designation || null,
        emp_id: formData.emp_id ? parseInt(formData.emp_id) : null,
        blocked: formData.blocked
      };

      if (mode === 'create') {
        payload.password = formData.password;
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (response.ok) {
          setSuccess(true);
          setTimeout(() => router.push('/users'), 1500);
        } else {
          const error = await response.json();
          setErrors({ submit: error.error || 'Failed to create user' });
        }
      } else if (mode === 'edit' && userId) {
        payload.user_id = parseInt(userId);
        const response = await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (response.ok) {
          setSuccess(true);
          setTimeout(() => router.push('/users'), 1500);
        } else {
          const error = await response.json();
          setErrors({ submit: error.error || 'Failed to update user' });
        }
      }
    } catch (error) {
      setErrors({ submit: 'Failed to save user' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const isView = mode === 'view';
  const title = mode === 'create' ? 'Create New User' : mode === 'edit' ? 'Edit User' : 'User Details';
  const subtitle = mode === 'create' ? 'Add a new system user' : mode === 'edit' ? 'Update user information' : 'View complete user information';

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className="w-6 h-6 text-red-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        <div className="flex items-center gap-4 mb-8">
          <Link href="/users" className="p-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <ArrowLeft size={20} className="text-red-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{title}</h1>
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-center gap-3">
            <CheckCircle size={20} className="text-emerald-600" />
            <p className="text-emerald-800 font-medium">User {mode === 'create' ? 'created' : 'updated'} successfully! Redirecting...</p>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3">
            <AlertCircle size={20} className="text-red-600" />
            <p className="text-red-800 font-medium">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500"></div>
            
            <div className="p-8">
              <div className="space-y-4">
                
                {/* Username */}
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">{formData.user_name || '-'}</div>
                  ) : (
                    <input type="text" name="user_name" value={formData.user_name} onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.user_name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                      placeholder="Username *" />
                  )}
                  {errors.user_name && <p className="mt-1 text-xs text-red-500 ml-2">{errors.user_name}</p>}
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">{formData.email || '-'}</div>
                  ) : (
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                      placeholder="Email *" />
                  )}
                  {errors.email && <p className="mt-1 text-xs text-red-500 ml-2">{errors.email}</p>}
                </div>

                {/* Password (only for create and edit) */}
                {!isView && (
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" />
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2 rounded-lg border ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                      placeholder={mode === 'create' ? 'Password *' : 'New password (leave blank to keep current)'} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    {errors.password && <p className="mt-1 text-xs text-red-500 ml-2">{errors.password}</p>}
                  </div>
                )}

                {/* Tenant */}
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {tenants.find(t => t.id == formData.tenant_id)?.tenant_name || formData.tenant_id || '-'}
                    </div>
                  ) : (
                    <select name="tenant_id" value={formData.tenant_id} onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.tenant_id ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-slate-800 text-sm`}>
                      <option value="">Select Tenant *</option>
                      {tenants.map((t) => (<option key={t.id} value={t.id}>{t.tenant_name}</option>))}
                    </select>
                  )}
                  {errors.tenant_id && <p className="mt-1 text-xs text-red-500 ml-2">{errors.tenant_id}</p>}
                </div>

                {/* Company */}
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {companies.find(c => c.id == formData.company_id)?.company_name || formData.company_id || '-'}
                    </div>
                  ) : (
                    <select name="company_id" value={formData.company_id} onChange={handleChange} disabled={!formData.tenant_id}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.company_id ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-slate-800 text-sm`}>
                      <option value="">Select Company *</option>
                      {companies.map((c) => (<option key={c.id} value={c.id}>{c.company_name}</option>))}
                    </select>
                  )}
                  {errors.company_id && <p className="mt-1 text-xs text-red-500 ml-2">{errors.company_id}</p>}
                </div>

                {/* Branch */}
                <div className="relative">
                  <Store size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {branches.find(b => b.id == formData.branch_id)?.branch_name || formData.branch_id || '-'}
                    </div>
                  ) : (
                    <select name="branch_id" value={formData.branch_id} onChange={handleChange} disabled={!formData.company_id}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.branch_id ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-slate-800 text-sm`}>
                      <option value="">Select Branch *</option>
                      {branches.map((b) => (<option key={b.id} value={b.id}>{b.branch_name}</option>))}
                    </select>
                  )}
                  {errors.branch_id && <p className="mt-1 text-xs text-red-500 ml-2">{errors.branch_id}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Designation */}
                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">{formData.user_designation || '-'}</div>
                    ) : (
                      <input type="text" name="user_designation" value={formData.user_designation} onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Designation" />
                    )}
                  </div>

                  {/* Employee ID */}
                  <div className="relative">
                    <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">{formData.emp_id || '-'}</div>
                    ) : (
                      <input type="number" name="emp_id" value={formData.emp_id} onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Employee ID" />
                    )}
                  </div>
                </div>

                {/* Block Status */}
                {!isView && (
                  <div className="relative p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock size={16} className="text-red-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">Account Status</p>
                          <p className="text-xs text-slate-500">Block this user to restrict access</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={formData.blocked === 'Y'} onChange={(e) => setFormData({ ...formData, blocked: e.target.checked ? 'Y' : 'N' })} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Buttons */}
              {!isView && (
                <div className="flex justify-end gap-4 pt-6 mt-4 border-t-2 border-slate-100">
                  <Link href="/users" className="px-5 py-2 bg-white border-2 border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all font-medium text-sm">Cancel</Link>
                  <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg transition-all font-semibold shadow-lg disabled:opacity-70 text-sm">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {loading ? 'Saving...' : mode === 'create' ? 'Create User' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}