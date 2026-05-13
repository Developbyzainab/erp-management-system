'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Building2, Phone, Users, Briefcase, 
  Loader2, CheckCircle, AlertCircle, Hash, User, Store
} from 'lucide-react';

interface DepartmentFormProps {
  mode: 'create' | 'edit' | 'view';
  initialData?: any;
  departmentId?: string;
}

export default function DepartmentForm({ mode, initialData = {}, departmentId }: DepartmentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(mode === 'edit' || mode === 'view');
  const [loadingBranches, setLoadingBranches] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    department_name: initialData?.department_name || '',
    tel_phone: initialData?.tel_phone || '',
    branch_id: initialData?.branch_id || '',
    ten_id: initialData?.ten_id || '',
    created_by: initialData?.created_by || ''
  });

  // Fetch branches for relation
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoadingBranches(true);
        const res = await fetch('/api/branches');
        const data = await res.json();
        setBranches(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setLoadingBranches(false);
      }
    };
    fetchBranches();
  }, []);

  // Fetch department data for edit/view mode
  useEffect(() => {
    const fetchDepartment = async () => {
      if ((mode === 'edit' || mode === 'view') && departmentId) {
        try {
          setLoadingData(true);
          const res = await fetch(`/api/departments?id=${departmentId}`);
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          setFormData({
            department_name: data.department_name || '',
            tel_phone: data.tel_phone || '',
            branch_id: data.branch_id || '',
            ten_id: data.ten_id || '',
            created_by: data.created_by || ''
          });
        } catch (error) {
          console.error('Error fetching department:', error);
        } finally {
          setLoadingData(false);
        }
      } else {
        setLoadingData(false);
      }
    };
    fetchDepartment();
  }, [mode, departmentId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.department_name.trim()) {
      newErrors.department_name = 'Department name is required';
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

      let url = '/api/departments';
      let method = 'POST';
      
      if (mode === 'edit' && departmentId) {
        formDataObj.append('id', departmentId);
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        body: formDataObj
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/departments'), 1500);
      } else {
        throw new Error(`Failed to ${mode === 'create' ? 'create' : 'update'} department`);
      }
    } catch (error) {
      setErrors({ submit: `Failed to ${mode === 'create' ? 'create' : 'update'} department` });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const isView = mode === 'view';
  const title = mode === 'create' ? 'Create New Department' : mode === 'edit' ? 'Edit Department' : 'Department Details';
  const subtitle = mode === 'create' ? 'Add a new department to your organization' : mode === 'edit' ? 'Update department information' : 'View complete department information';

  if (loadingData || loadingBranches) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/departments" className="p-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <ArrowLeft size={20} className="text-blue-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
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
              Department {mode === 'create' ? 'created' : 'updated'} successfully! Redirecting...
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
            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            <div className="p-8">
              <div className="space-y-4">
                
                {/* Department Name - Top pe */}
                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {formData.department_name || '-'}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="department_name"
                      value={formData.department_name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.department_name ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm`}
                      placeholder="Department name * (e.g., HR, IT, Sales)"
                    />
                  )}
                  {errors.department_name && <p className="mt-1 text-xs text-red-500 ml-2">{errors.department_name}</p>}
                </div>

                {/* Branch Selection - Second pe */}
                <div className="relative">
                  <Store size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500" />
                  {isView ? (
                    <div className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-sm">
                      {branches.find(b => b.id == formData.branch_id)?.branch_name || formData.branch_id || '-'}
                    </div>
                  ) : (
                    <select
                      name="branch_id"
                      value={formData.branch_id}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800 text-sm"
                    >
                      <option value="">Select Branch</option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.branch_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500" />
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
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                      placeholder="Phone number"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Tenant ID */}
                  <div className="relative">
                    <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500" />
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
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Tenant ID"
                      />
                    )}
                  </div>

                  {/* Created By */}
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500" />
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
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800 placeholder:text-slate-400 text-sm"
                        placeholder="Created by (User ID)"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Buttons */}
              {!isView && (
                <div className="flex justify-end gap-4 pt-6 mt-4 border-t-2 border-slate-100">
                  <Link href="/departments" className="px-5 py-2 bg-white border-2 border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all font-medium text-sm">
                    Cancel
                  </Link>
                  <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all font-semibold shadow-lg disabled:opacity-70 text-sm">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {loading ? 'Saving...' : mode === 'create' ? 'Create Department' : 'Save Changes'}
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