'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Building, Phone, MapPin, Mail, User, 
  FileText, Globe, Hash, Briefcase, Link as LinkIcon, 
  Loader2, Edit, Trash2, Calendar, Smartphone
} from 'lucide-react';

export default function ViewCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      fetchCompany(id);
    };
    getId();
  }, [params]);

  const fetchCompany = async (id: string) => {
    try {
      const res = await fetch(`/api/company?id=${id}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setCompany(data);
    } catch (error) {
      console.error('Error fetching company:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/company?id=${company.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Building size={48} className="text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Company not found</p>
          <Link href="/company" className="mt-4 inline-flex items-center gap-2 text-indigo-600">
            <ArrowLeft size={16} />
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-8 py-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/company" className="p-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <ArrowLeft size={20} className="text-indigo-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Company Details
              </h1>
              <p className="text-sm text-slate-500 mt-1">View complete company information</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link 
              href={`/company/${company.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all font-semibold shadow-md text-sm"
            >
              <Edit size={14} />
              Edit
            </Link>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-semibold shadow-md text-sm"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        {/* Company Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          {/* Header with Logo - Chota kiya */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                {company.company_name?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{company.company_name}</h2>
                {company.tax_no && (
                  <p className="text-xs text-slate-500 mt-0.5">NTN: {company.tax_no}</p>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid - Fields choti ki hain */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              {/* Contact Person */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <User size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Contact Person</p>
                  <p className="text-sm text-slate-800 font-medium">{company.contact_person || '-'}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <Phone size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Phone Number</p>
                  <p className="text-sm text-slate-800 font-medium">{company.tel_phone || '-'}</p>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <Smartphone size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Mobile Number</p>
                  <p className="text-sm text-slate-800 font-medium">{company.mobile || '-'}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <Mail size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Email Address</p>
                  {company.email ? (
                    <a href={`mailto:${company.email}`} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      {company.email}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-800">-</p>
                  )}
                </div>
              </div>

              {/* Website */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <Globe size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Website</p>
                  {company.website ? (
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium truncate block max-w-[200px]">
                      {company.website}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-800">-</p>
                  )}
                </div>
              </div>

              {/* Address - Full width */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg md:col-span-2">
                <MapPin size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Address</p>
                  <p className="text-sm text-slate-800">{company.address || '-'}</p>
                </div>
              </div>

              {/* Tenant ID */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <Hash size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Tenant ID</p>
                  <p className="text-sm text-slate-800 font-medium">{company.ten_id || '-'}</p>
                </div>
              </div>

              {/* Organization ID */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <Briefcase size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Organization ID</p>
                  <p className="text-sm text-slate-800 font-medium">{company.org_id || '-'}</p>
                </div>
              </div>

              {/* Logo Path */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <LinkIcon size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Logo Path</p>
                  <p className="text-xs text-slate-800 font-mono">{company.logo_path || '-'}</p>
                </div>
              </div>

              {/* Created By */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <User size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Created By</p>
                  <p className="text-sm text-slate-800 font-medium">{company.created_by || '-'}</p>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <Calendar size={14} className="text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Created Date</p>
                  <p className="text-sm text-slate-800 font-medium">
                    {company.created_date ? new Date(company.created_date).toLocaleDateString() : '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Delete Company</h3>
                  <p className="text-xs text-slate-500">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5">
                Are you sure you want to delete <strong className="text-red-600">{company.company_name}</strong>?
              </p>
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowDeleteModal(false)} 
                  className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete} 
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}