'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Building, Phone, MapPin, Mail, User, 
  FileText, Globe, Hash, Briefcase, Link as LinkIcon, Loader2, 
  CheckCircle, AlertCircle, Smartphone, Store, Building2
} from 'lucide-react';

interface BranchFormProps {
  mode: 'create' | 'edit' | 'view';
  initialData?: any;
  branchId?: string;
}

export default function BranchForm({ mode, initialData = {}, branchId }: BranchFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(mode === 'edit' || mode === 'view');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    branch_name: '',
    tax_no: '',
    contact_person: '',
    tel_phone: '',
    mobile: '',
    email: '',
    website: '',
    address: '',
    ten_id: '',
    org_id: '',
    company_id: '',
    logo_path: '',
    created_by: ''
  });

  // Fetch companies for relation
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/company');
        const data = await res.json();
        setCompanies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch branch data for edit/view mode
  useEffect(() => {
    const fetchBranch = async () => {
      if ((mode === 'edit' || mode === 'view') && branchId) {
        try {
          setLoadingData(true);
          const res = await fetch(`/api/branches?id=${branchId}`);
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          setFormData({
            branch_name: data.branch_name || '',
            tax_no: data.tax_no || '',
            contact_person: data.contact_person || '',
            tel_phone: data.tel_phone || '',
            mobile: data.mobile || '',
            email: data.email || '',
            website: data.website || '',
            address: data.address || '',
            ten_id: data.ten_id || '',
            org_id: data.org_id || '',
            company_id: data.company_id || '',
            logo_path: data.logo_path || '',
            created_by: data.created_by || ''
          });
        } catch (error) {
          console.error('Error fetching branch:', error);
        } finally {
          setLoadingData(false);
        }
      } else {
        setLoadingData(false);
      }
    };
    fetchBranch();
  }, [mode, branchId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.branch_name.trim()) {
      newErrors.branch_name = 'Branch name is required';
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
      Object.keys(formData).forEach(key => {
        if (formData[key as keyof typeof formData]) {
          formDataObj.append(key, String(formData[key as keyof typeof formData]));
        }
      });

      let url = '/api/branches';
      let method = 'POST';
      
      if (mode === 'edit' && branchId) {
        formDataObj.append('id', branchId);
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        body: formDataObj
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/branches'), 1500);
      } else {
        throw new Error(`Failed to ${mode === 'create' ? 'create' : 'update'} branch`);
      }
    } catch (error) {
      setErrors({ submit: `Failed to ${mode === 'create' ? 'create' : 'update'} branch` });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const isView = mode === 'view';
  const title = mode === 'create' ? 'Create New Branch' : mode === 'edit' ? 'Edit Branch' : 'Branch Details';
  const subtitle = mode === 'create' ? 'Add a new branch to your organization' : mode === 'edit' ? 'Update branch information' : 'View complete branch information';

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Store className="w-6 h-6 text-emerald-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/branches" className="p-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <ArrowLeft size={20} className="text-emerald-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl flex items-center gap-3">
            <CheckCircle size={20} className="text-emerald-600" />
            <p className="text-emerald-800 font-medium">
              Branch {mode === 'create' ? 'created' : 'updated'} successfully! Redirecting...
            </p>
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
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500"></div>
            
            <div className="p-8">
              <div className="space-y-4">
                
                {/* Branch Name */}
                <div className="relative">
                  <Store size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {formData.branch_name || '-'}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="branch_name"
                      value={formData.branch_name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.branch_name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                      placeholder="Branch name *"
                    />
                  )}
                  {errors.branch_name && <p className="mt-1 text-xs text-red-500 ml-2">{errors.branch_name}</p>}
                </div>

                {/* Company Relation */}
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {companies.find(c => c.id == formData.company_id)?.company_name || formData.company_id || '-'}
                    </div>
                  ) : (
                    <select
                      name="company_id"
                      value={formData.company_id}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 text-sm"
                    >
                      <option value="">Select Company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.company_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Tax Number */}
                  <div className="relative">
                    <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.tax_no || '-'}
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="tax_no"
                        value={formData.tax_no}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Tax number / NTN"
                      />
                    )}
                  </div>

                  {/* Contact Person */}
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.contact_person || '-'}
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="contact_person"
                        value={formData.contact_person}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Contact person"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.tel_phone || '-'}
                      </div>
                    ) : (
                      <input
                        type="tel"
                        name="tel_phone"
                        value={formData.tel_phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Phone number"
                      />
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="relative">
                    <Smartphone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.mobile || '-'}
                      </div>
                    ) : (
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Mobile number"
                      />
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {formData.email || '-'}
                    </div>
                  ) : (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                      placeholder="Email address"
                    />
                  )}
                  {errors.email && <p className="mt-1 text-xs text-red-500 ml-2">{errors.email}</p>}
                </div>

                {/* Website */}
                <div className="relative">
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {formData.website || '-'}
                    </div>
                  ) : (
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Website URL"
                    />
                  )}
                </div>

                {/* Address */}
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3 text-emerald-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm min-h-[60px]">
                      {formData.address || '-'}
                    </div>
                  ) : (
                    <textarea
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none text-sm"
                      placeholder="Complete address"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Tenant ID */}
                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.ten_id || '-'}
                      </div>
                    ) : (
                      <input
                        type="number"
                        name="ten_id"
                        value={formData.ten_id}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Tenant ID"
                      />
                    )}
                  </div>

                  {/* Organization ID */}
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.org_id || '-'}
                      </div>
                    ) : (
                      <input
                        type="number"
                        name="org_id"
                        value={formData.org_id}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Organization ID"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Logo Path */}
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.logo_path || '-'}
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="logo_path"
                        value={formData.logo_path}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Logo path"
                      />
                    )}
                  </div>

                  {/* Created By */}
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.created_by || '-'}
                      </div>
                    ) : (
                      <input
                        type="number"
                        name="created_by"
                        value={formData.created_by}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Created by (User ID)"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Buttons */}
              {!isView && (
                <div className="flex justify-end gap-4 pt-6 mt-4 border-t-2 border-slate-100">
                  <Link href="/branches" className="px-5 py-2 bg-white border-2 border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all font-medium text-sm">
                    Cancel
                  </Link>
                  <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all font-semibold shadow-lg disabled:opacity-70 text-sm">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {loading ? 'Saving...' : mode === 'create' ? 'Create Branch' : 'Save Changes'}
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