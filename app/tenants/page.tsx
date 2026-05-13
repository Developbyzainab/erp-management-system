'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, Plus, Eye, Edit, Trash2, Mail, Phone, 
  Calendar, Loader2, Search, CheckCircle, XCircle,
  ChevronFirst, ChevronLeft, ChevronRight, ChevronLast
} from 'lucide-react';

export default function TenantsPage() {
  const router = useRouter();
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchTenants();
  }, [currentPage, sortBy, searchTerm]);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/tenants');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const tenantsData = Array.isArray(data) ? data : [];
      
      let sorted = [...tenantsData];
      if (sortBy === 'newest') {
        sorted.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      } else if (sortBy === 'oldest') {
        sorted.sort((a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime());
      } else if (sortBy === 'name') {
        sorted.sort((a, b) => (a.tenant_name || '').localeCompare(b.tenant_name || ''));
      }
      
      const filtered = sorted.filter(tenant =>
        tenant.tenant_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.tenant_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.contact_person?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filtered.slice(startIndex, endIndex);
      
      setTenants(paginatedData);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching tenants:', error);
      setError('Failed to load tenants');
      setTenants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/tenants?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setShowDeleteModal(false);
        setSelectedTenant(null);
        fetchTenants();
      }
    } catch (error) {
      console.error('Error deleting tenant:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchTenants();
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToLastPage = () => setCurrentPage(totalPages);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    let items = [];
    for (let number of getPageNumbers()) {
      items.push(
        <button
          key={number}
          onClick={() => paginate(number)}
          disabled={loading}
          className={`px-2 py-1 text-xs rounded transition-all duration-200 cursor-pointer ${
            number === currentPage
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
          }`}
        >
          {number}
        </button>
      );
    }
    
    return (
      <div className="flex justify-center items-center gap-1 mt-6">
        <button
          onClick={goToFirstPage}
          disabled={currentPage === 1 || loading}
          className="px-2 py-1 text-xs rounded bg-white text-gray-700 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 border border-gray-200"
        >
          <ChevronFirst size={14} />
          First
        </button>
        
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1 || loading}
          className="px-2 py-1 text-xs rounded bg-white text-gray-700 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 border border-gray-200"
        >
          <ChevronLeft size={14} />
          Prev
        </button>
        
        <div className="flex gap-1">{items}</div>
        
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || loading}
          className="px-2 py-1 text-xs rounded bg-white text-gray-700 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 border border-gray-200"
        >
          Next
          <ChevronRight size={14} />
        </button>
        
        <button
          onClick={goToLastPage}
          disabled={currentPage === totalPages || loading}
          className="px-2 py-1 text-xs rounded bg-white text-gray-700 shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 border border-gray-200"
        >
          Last
          <ChevronLast size={14} />
        </button>
      </div>
    );
  };

  if (loading && tenants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className="w-6 h-6 text-indigo-600 animate-pulse" />
          </div>
        </div>
        <p className="text-slate-500 text-sm">Loading clients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
                Clients
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage all your client organizations</p>
            </div>
            <Link 
              href="/tenants/create" 
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 text-sm font-semibold shadow-md shadow-indigo-500/25 group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              New Client
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by name, email, code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white focus:border-indigo-500 outline-none text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Sort by Name</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-1">
              <Search size={16} />
              Search
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Contact</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Code</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Created</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                          {tenant.tenant_name?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{tenant.tenant_name}</p>
                          {tenant.email && <p className="text-xs text-slate-500">{tenant.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {tenant.mobile && (
                        <div className="flex items-center gap-1">
                          <Phone size={11} className="text-indigo-500" />
                          <span>{tenant.mobile}</span>
                        </div>
                      )}
                      {tenant.contact_person && (
                        <div className="flex items-center gap-1 mt-1">
                          <Users size={11} className="text-indigo-400" />
                          <span className="text-slate-500">{tenant.contact_person}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono">{tenant.tenant_code || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        tenant.locked === 1 
                          ? 'bg-rose-100 text-rose-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {tenant.locked === 1 ? <XCircle size={10} /> : <CheckCircle size={10} />}
                        {tenant.locked === 1 ? 'Locked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar size={11} className="text-indigo-500" />
                        <span>{tenant.created_date ? new Date(tenant.created_date).toLocaleDateString() : '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/tenants/${tenant.id}`} className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                          <Eye size={14} />
                        </Link>
                        <Link href={`/tenants/${tenant.id}/edit`} className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                          <Edit size={14} />
                        </Link>
                        <button onClick={() => { setSelectedTenant(tenant); setShowDeleteModal(true); }} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {tenants.length === 0 && (
            <div className="text-center py-12">
              <Users size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No clients found</p>
            </div>
          )}
        </div>

        {renderPagination()}

        {showDeleteModal && selectedTenant && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Delete Client</h3>
                  <p className="text-xs text-slate-500">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5">Are you sure you want to delete <strong className="text-red-600">{selectedTenant.tenant_name}</strong>?</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowDeleteModal(false)} className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm">Cancel</button>
                <button onClick={() => handleDelete(selectedTenant.id)} className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm flex items-center gap-2" disabled={deleting}>
                  {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}