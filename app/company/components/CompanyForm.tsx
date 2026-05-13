'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Building, Phone, MapPin, Mail, User, 
  FileText, Globe, Hash, Briefcase, Link as LinkIcon, Loader2, 
  CheckCircle, AlertCircle, Smartphone, Sparkles
} from 'lucide-react';

interface CompanyFormProps {
  mode: 'create' | 'edit';
  initialData?: any;
  action?: any;
}

export default function CompanyForm({ mode, initialData = {}, action }: CompanyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    company_name: initialData?.company_name || '',
    tax_no: initialData?.tax_no || '',
    contact_person: initialData?.contact_person || '',
    tel_phone: initialData?.tel_phone || '',
    mobile: initialData?.mobile || '',
    email: initialData?.email || '',
    website: initialData?.website || '',
    address: initialData?.address || '',
    ten_id: initialData?.ten_id || '',
    org_id: initialData?.org_id || '',
    logo_path: initialData?.logo_path || '',
    created_by: initialData?.created_by || ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess(false);

    try {
      if (mode === 'create') {
        const formDataObj = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key as keyof typeof formData]) {
            formDataObj.append(key, formData[key as keyof typeof formData]);
          }
        });

        const response = await fetch('/api/company', {
          method: 'POST',
          body: formDataObj
        });

        if (response.ok) {
          setSuccess(true);
          setTimeout(() => router.push('/company'), 1500);
        } else {
          throw new Error('Failed to create');
        }
      } else if (action) {
        const formDataObj = new FormData(e.target as HTMLFormElement);
        await action(formDataObj);
        setSuccess(true);
        setTimeout(() => router.push('/company'), 1500);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to save company' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/company" 
            className="p-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <ArrowLeft size={20} className="text-indigo-600 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {mode === 'create' ? 'Create New Company' : 'Edit Company'}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Sparkles size={14} className="text-indigo-500" />
              <p className="text-sm text-slate-500">
                {mode === 'create' ? 'Add a new company to your portfolio' : 'Update your company information'}
              </p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-center gap-3">
            <CheckCircle size={20} className="text-emerald-600" />
            <p className="text-emerald-800 font-medium">
              Company {mode === 'create' ? 'created' : 'updated'} successfully! Redirecting...
            </p>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3">
            <AlertCircle size={20} className="text-red-600" />
            <p className="text-red-800 font-medium">{errors.submit}</p>
          </div>
        )}

        {/* Single Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-8">
              {/* All fields in one place */}
              <div className="space-y-5">
                
                {/* Company Name */}
                <div className="relative">
                  <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${errors.company_name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400`}
                    placeholder="Company name *"
                    required
                  />
                  {errors.company_name && <p className="mt-2 text-xs text-red-500 ml-2">{errors.company_name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Tax Number */}
                  <div className="relative">
                    <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="text"
                      name="tax_no"
                      value={formData.tax_no}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                      placeholder="Tax number / NTN"
                    />
                  </div>

                  {/* Contact Person */}
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="text"
                      name="contact_person"
                      value={formData.contact_person}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                      placeholder="Contact person"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="tel"
                      name="tel_phone"
                      value={formData.tel_phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                      placeholder="Phone number"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="relative">
                    <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                      placeholder="Mobile number"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400`}
                    placeholder="Email address"
                  />
                  {errors.email && <p className="mt-2 text-xs text-red-500 ml-2">{errors.email}</p>}
                </div>

                {/* Website */}
                <div className="relative">
                  <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                    placeholder="Website URL"
                  />
                </div>

                {/* Address */}
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-4 text-indigo-500" />
                  <textarea
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                    placeholder="Complete address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Tenant ID */}
                  <div className="relative">
                    <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="number"
                      name="ten_id"
                      value={formData.ten_id}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                      placeholder="Tenant ID"
                    />
                  </div>

                  {/* Organization ID */}
                  <div className="relative">
                    <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="number"
                      name="org_id"
                      value={formData.org_id}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                      placeholder="Organization ID"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Logo Path */}
                  <div className="relative">
                    <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="text"
                      name="logo_path"
                      value={formData.logo_path}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                      placeholder="Logo path"
                    />
                  </div>

                  {/* Created By */}
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="number"
                      name="created_by"
                      value={formData.created_by}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                      placeholder="Created by (User ID)"
                    />
                  </div>
                </div>
              </div>

              {/* Actions Buttons */}
              <div className="flex justify-end gap-4 pt-8 mt-4 border-t-2 border-slate-100">
                <Link 
                  href="/company" 
                  className="px-6 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium"
                >
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl disabled:opacity-70"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {loading ? 'Saving...' : mode === 'create' ? 'Create Company' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}