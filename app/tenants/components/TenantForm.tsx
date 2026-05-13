'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Building2, Phone, MapPin, Mail, User, 
  FileText, Globe, Hash, Briefcase, Link as LinkIcon, Loader2, 
  CheckCircle, AlertCircle, Smartphone, Users, CreditCard, Lock, Calendar
} from 'lucide-react';

interface TenantFormProps {
  mode: 'create' | 'edit' | 'view';
  initialData?: any;
  tenantId?: string;
}

export default function TenantForm({ mode, initialData = {}, tenantId }: TenantFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(mode === 'edit' || mode === 'view');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    tenant_name: initialData?.tenant_name || '',
    tenant_code: initialData?.tenant_code || '',
    tax_no: initialData?.tax_no || '',
    acc_no: initialData?.acc_no || '',
    contact_person: initialData?.contact_person || '',
    tel_phone: initialData?.tel_phone || '',
    mobile: initialData?.mobile || '',
    email: initialData?.email || '',
    website: initialData?.website || '',
    address: initialData?.address || '',
    shr_cnt_code: initialData?.shr_cnt_code || '',
    shr_cty_code: initialData?.shr_cty_code || '',
    shr_cur_code: initialData?.shr_cur_code || '',
    locked: initialData?.locked || 0,
    created_by: initialData?.created_by || ''
  });

  // Fetch tenant data for edit/view mode
  useEffect(() => {
    const fetchTenant = async () => {
      if ((mode === 'edit' || mode === 'view') && tenantId) {
        try {
          setLoadingData(true);
          const res = await fetch(`/api/tenants?id=${tenantId}`);
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          setFormData({
            tenant_name: data.tenant_name || '',
            tenant_code: data.tenant_code || '',
            tax_no: data.tax_no || '',
            acc_no: data.acc_no || '',
            contact_person: data.contact_person || '',
            tel_phone: data.tel_phone || '',
            mobile: data.mobile || '',
            email: data.email || '',
            website: data.website || '',
            address: data.address || '',
            shr_cnt_code: data.shr_cnt_code || '',
            shr_cty_code: data.shr_cty_code || '',
            shr_cur_code: data.shr_cur_code || '',
            locked: data.locked || 0,
            created_by: data.created_by || ''
          });
        } catch (error) {
          console.error('Error fetching tenant:', error);
          setErrorMessage('Failed to load tenant data');
        } finally {
          setLoadingData(false);
        }
      } else {
        setLoadingData(false);
      }
    };
    fetchTenant();
  }, [mode, tenantId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.tenant_name.trim()) {
      newErrors.tenant_name = 'Client name is required';
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
    setErrorMessage('');

    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof typeof formData];
        if (value !== undefined && value !== null && value !== '') {
          formDataObj.append(key, String(value));
        }
      });

      let url = '/api/tenants';
      let method = 'POST';
      
      if (mode === 'edit' && tenantId) {
        formDataObj.append('id', tenantId);
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        body: formDataObj
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/tenants'), 1500);
      } else {
        setErrorMessage(data.error || `Failed to ${mode === 'create' ? 'create' : 'update'} client`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setErrorMessage(`Failed to ${mode === 'create' ? 'create' : 'update'} client. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked ? 1 : 0 : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    if (errorMessage) setErrorMessage('');
  };

  const isView = mode === 'view';
  const title = mode === 'create' ? 'Create New Client' : mode === 'edit' ? 'Edit Client' : 'Client Details';
  const subtitle = mode === 'create' ? 'Add a new client to your portfolio' : mode === 'edit' ? 'Update client information' : 'View complete client information';

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className="w-6 h-6 text-indigo-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/tenants" className="p-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <ArrowLeft size={20} className="text-indigo-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
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
              Client {mode === 'create' ? 'created' : 'updated'} successfully! Redirecting...
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3">
            <AlertCircle size={20} className="text-red-600" />
            <p className="text-red-800 font-medium">{errorMessage}</p>
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
                
                {/* Client Name */}
                <div className="relative">
                  <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {formData.tenant_name || '-'}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="tenant_name"
                      value={formData.tenant_name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.tenant_name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                      placeholder="Client name *"
                    />
                  )}
                  {errors.tenant_name && <p className="mt-1 text-xs text-red-500 ml-2">{errors.tenant_name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Client Code */}
                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.tenant_code || '-'}
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="tenant_code"
                        value={formData.tenant_code}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Client code"
                      />
                    )}
                  </div>

                  {/* Tax Number */}
                  <div className="relative">
                    <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
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
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Tax number / NTN"
                      />
                    )}
                  </div>
                </div>

                {/* Account Number */}
                <div className="relative">
                  <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {formData.acc_no || '-'}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="acc_no"
                      value={formData.acc_no}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Account number"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Contact Person */}
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
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
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Contact person"
                      />
                    )}
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
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
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Phone number"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Mobile */}
                  <div className="relative">
                    <Smartphone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
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
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Mobile number"
                      />
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
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
                        className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                        placeholder="Email address"
                      />
                    )}
                  </div>
                </div>

                {/* Website */}
                <div className="relative">
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
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
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Website URL"
                    />
                  )}
                </div>

                {/* Address */}
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3 text-indigo-500" />
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
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none text-sm"
                      placeholder="Complete address"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Country */}
                  <div className="relative">
                    <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.shr_cnt_code === 'PK' ? 'Pakistan' : 
                         formData.shr_cnt_code === 'US' ? 'United States' :
                         formData.shr_cnt_code === 'UK' ? 'United Kingdom' :
                         formData.shr_cnt_code === 'AE' ? 'UAE' : formData.shr_cnt_code || '-'}
                      </div>
                    ) : (
                      <select
                        name="shr_cnt_code"
                        value={formData.shr_cnt_code}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 text-sm"
                      >
                        <option value="">Select Country</option>
                        <option value="PK">Pakistan</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AE">UAE</option>
                      </select>
                    )}
                  </div>

                  {/* City */}
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.shr_cty_code === 'KHI' ? 'Karachi' :
                         formData.shr_cty_code === 'LHE' ? 'Lahore' :
                         formData.shr_cty_code === 'ISB' ? 'Islamabad' : formData.shr_cty_code || '-'}
                      </div>
                    ) : (
                      <select
                        name="shr_cty_code"
                        value={formData.shr_cty_code}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 text-sm"
                      >
                        <option value="">Select City</option>
                        <option value="KHI">Karachi</option>
                        <option value="LHE">Lahore</option>
                        <option value="ISB">Islamabad</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Currency */}
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
                    {isView ? (
                      <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                        {formData.shr_cur_code === 'PKR' ? 'Pakistani Rupee' :
                         formData.shr_cur_code === 'USD' ? 'US Dollar' :
                         formData.shr_cur_code === 'EUR' ? 'Euro' : formData.shr_cur_code || '-'}
                      </div>
                    ) : (
                      <select
                        name="shr_cur_code"
                        value={formData.shr_cur_code}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 text-sm"
                      >
                        <option value="">Select Currency</option>
                        <option value="PKR">Pakistani Rupee (PKR)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    )}
                  </div>

                  {/* Created By */}
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500" />
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
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Created by (User ID)"
                      />
                    )}
                  </div>
                </div>

                {/* Lock Status */}
                <div className="relative p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock size={16} className="text-indigo-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">Account Lock Status</p>
                        <p className="text-xs text-slate-500">Lock this client to temporarily restrict access</p>
                      </div>
                    </div>
                    {isView ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${formData.locked === 1 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {formData.locked === 1 ? 'Locked' : 'Active'}
                      </span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="locked"
                          checked={formData.locked === 1}
                          onChange={(e) => setFormData({ ...formData, locked: e.target.checked ? 1 : 0 })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Buttons */}
              {!isView && (
                <div className="flex justify-end gap-4 pt-6 mt-4 border-t-2 border-slate-100">
                  <Link href="/tenants" className="px-5 py-2 bg-white border-2 border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all font-medium text-sm">
                    Cancel
                  </Link>
                  <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all font-semibold shadow-lg disabled:opacity-70 text-sm">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {loading ? 'Saving...' : mode === 'create' ? 'Create Client' : 'Save Changes'}
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