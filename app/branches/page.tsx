'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Store, Plus, Eye, Edit, Trash2, Mail, Phone, 
  Calendar, Loader2, Search, User,
  ChevronFirst, ChevronLeft, ChevronRight, ChevronLast
} from 'lucide-react';

export default function BranchesPage() {
  const router = useRouter();
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchBranches();
  }, [currentPage, sortBy, searchTerm]);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/branches');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const branchesData = Array.isArray(data) ? data : [];
      
      let sorted = [...branchesData];
      if (sortBy === 'newest') {
        sorted.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      } else if (sortBy === 'oldest') {
        sorted.sort((a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime());
      } else if (sortBy === 'name') {
        sorted.sort((a, b) => (a.branch_name || '').localeCompare(b.branch_name || ''));
      }
      
      const filtered = sorted.filter(branch =>
        branch.branch_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.tax_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        branch.contact_person?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filtered.slice(startIndex, endIndex);
      
      setBranches(paginatedData);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching branches:', error);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this branch?')) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/branches?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setShowDeleteModal(false);
        setSelectedBranch(null);
        fetchBranches();
      }
    } catch (error) {
      console.error('Error deleting branch:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBranches();
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
              ? 'bg-emerald-600 text-white shadow'
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

  if (loading && branches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Store className="w-6 h-6 text-emerald-600 animate-pulse" />
          </div>
        </div>
        <p className="text-slate-500 text-sm">Loading branches...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-emerald-600 bg-clip-text text-transparent">
                Branches
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage all your business branches</p>
            </div>
            <Link 
              href="/branches/create" 
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-300 text-sm font-semibold shadow-md shadow-emerald-500/25 group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              New Branch
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by name, email, tax number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white focus:border-emerald-500 outline-none text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Sort by Name</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 flex items-center gap-1">
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
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Branch</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Contact</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Tax Number</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Created</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {branches.map((branch) => (
                  <tr key={branch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                          {branch.branch_name?.charAt(0) || 'B'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{branch.branch_name}</p>
                          {branch.email && <p className="text-xs text-slate-500">{branch.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {(branch.tel_phone || branch.mobile) && (
                        <div className="flex items-center gap-1">
                          <Phone size={11} className="text-emerald-500" />
                          <span>{branch.tel_phone || branch.mobile}</span>
                        </div>
                      )}
                      {branch.contact_person && (
                        <div className="flex items-center gap-1 mt-1">
                          <User size={11} className="text-emerald-400" />
                          <span className="text-slate-500">{branch.contact_person}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs">{branch.tax_no || '-'}</td>
                    <td className="px-4 py-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar size={11} className="text-emerald-500" />
                        <span>{branch.created_date ? new Date(branch.created_date).toLocaleDateString() : '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/branches/${branch.id}`} className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                          <Eye size={14} />
                        </Link>
                        <Link href={`/branches/${branch.id}/edit`} className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                          <Edit size={14} />
                        </Link>
                        <button onClick={() => { setSelectedBranch(branch); setShowDeleteModal(true); }} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {branches.length === 0 && (
            <div className="text-center py-12">
              <Store size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No branches found</p>
            </div>
          )}
        </div>

        {renderPagination()}

        {showDeleteModal && selectedBranch && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Delete Branch</h3>
                  <p className="text-xs text-slate-500">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5">Are you sure you want to delete <strong className="text-red-600">{selectedBranch.branch_name}</strong>?</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowDeleteModal(false)} className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm">Cancel</button>
                <button onClick={() => handleDelete(selectedBranch.id)} className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm flex items-center gap-2" disabled={deleting}>
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