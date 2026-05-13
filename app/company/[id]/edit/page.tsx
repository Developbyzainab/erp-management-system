'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Building, Phone, MapPin, Mail, User, 
  FileText, Globe, Hash, Briefcase, Link as LinkIcon, Loader2, 
  CheckCircle, AlertCircle, Smartphone
} from 'lucide-react';

export default function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    tax_no: '',
    contact_person: '',
    tel_phone: '',
    mobile: '',
    email: '',
    website: '',
    address: '',
    ten_id: '',
    org_id: '',
    logo_path: '',
    created_by: ''
  });

  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      setCompanyId(id);
      fetchCompany(id);
    };
    getId();
  }, [params]);

  const fetchCompany = async (id: string) => {
    try {
      const res = await fetch(`/api/company?id=${id}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setFormData({
        company_name: data.company_name || '',
        tax_no: data.tax_no || '',
        contact_person: data.contact_person || '',
        tel_phone: data.tel_phone || '',
        mobile: data.mobile || '',
        email: data.email || '',
        website: data.website || '',
        address: data.address || '',
        ten_id: data.ten_id || '',
        org_id: data.org_id || '',
        logo_path: data.logo_path || '',
        created_by: data.created_by || ''
      });
    } catch (error) {
      console.error('Error fetching company:', error);
    } finally {
      setLoadingData(false);
    }
  };

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
      const formDataObj = new FormData();
      formDataObj.append('id', companyId || '');
      Object.keys(formData).forEach(key => {
        if (formData[key as keyof typeof formData]) {
          formDataObj.append(key, formData[key as keyof typeof formData]);
        }
      });

      const response = await fetch('/api/company', {
        method: 'PUT',
        body: formDataObj
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/company'), 1500);
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to update company' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/company" className="p-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <ArrowLeft size={20} className="text-indigo-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Edit Company
            </h1>
            <p className="text-sm text-slate-500 mt-1">Update your company information</p>
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-center gap-3">
            <CheckCircle size={20} className="text-emerald-600" />
            <p className="text-emerald-800 font-medium">Company updated successfully! Redirecting...</p>
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3">
            <AlertCircle size={20} className="text-red-600" />
            <p className="text-red-800 font-medium">{errors.submit}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-8">
              <div className="space-y-4">
                {/* Company Name */}
                <div className="relative">
                  <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.company_name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                    placeholder="Company name *"
                  />
                  {errors.company_name && <p className="mt-1 text-xs text-red-500 ml-2">{errors.company_name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="text"
                      name="tax_no"
                      value={formData.tax_no}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Tax number / NTN"
                    />
                  </div>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="text"
                      name="contact_person"
                      value={formData.contact_person}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Contact person"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="tel"
                      name="tel_phone"
                      value={formData.tel_phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="relative">
                    <Smartphone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Mobile number"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                    placeholder="Email address"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500 ml-2">{errors.email}</p>}
                </div>

                <div className="relative">
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                    placeholder="Website URL"
                  />
                </div>

                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3 text-indigo-500" />
                  <textarea
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none text-sm"
                    placeholder="Complete address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="number"
                      name="ten_id"
                      value={formData.ten_id}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Tenant ID"
                    />
                  </div>
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="number"
                      name="org_id"
                      value={formData.org_id}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Organization ID"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="text"
                      name="logo_path"
                      value={formData.logo_path}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Logo path"
                    />
                  </div>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    <input
                      type="number"
                      name="created_by"
                      value={formData.created_by}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Created by (User ID)"
                    />
                  </div>
                </div>
              </div>

              {/* Actions Buttons */}
              <div className="flex justify-end gap-4 pt-6 mt-4 border-t-2 border-slate-100">
                <Link href="/company" className="px-5 py-2 bg-white border-2 border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all font-medium text-sm">
                  Cancel
                </Link>
                <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all font-semibold shadow-lg disabled:opacity-70 text-sm">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}