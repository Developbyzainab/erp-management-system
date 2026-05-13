'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, Plus, Eye, Edit, Trash2, Phone, 
  Calendar, Loader2, Search, Building2,
  ChevronFirst, ChevronLeft, ChevronRight, ChevronLast
} from 'lucide-react';

export default function DepartmentsPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchDepartments();
  }, [currentPage, sortBy, searchTerm]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/departments');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const departmentsData = Array.isArray(data) ? data : [];
      
      let sorted = [...departmentsData];
      if (sortBy === 'newest') {
        sorted.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      } else if (sortBy === 'oldest') {
        sorted.sort((a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime());
      } else if (sortBy === 'name') {
        sorted.sort((a, b) => (a.department_name || '').localeCompare(b.department_name || ''));
      }
      
      const filtered = sorted.filter(dept =>
        dept.department_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.tel_phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.branch_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filtered.slice(startIndex, endIndex);
      
      setDepartments(paginatedData);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching departments:', error);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/departments?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setShowDeleteModal(false);
        setSelectedDepartment(null);
        fetchDepartments();
      }
    } catch (error) {
      console.error('Error deleting department:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchDepartments();
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
              ? 'bg-blue-600 text-white shadow'
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

  if (loading && departments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
        </div>
        <p className="text-slate-500 text-sm">Loading departments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
                Departments
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage all your organization departments</p>
            </div>
            <Link 
              href="/departments/create" 
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm font-semibold shadow-md shadow-blue-500/25 group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              New Department
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-3 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by name, phone, branch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white focus:border-blue-500 outline-none text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Sort by Name</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-1">
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
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Branch</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Phone</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">Created</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {departments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                          {dept.department_name?.charAt(0) || 'D'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{dept.department_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {dept.branch_name ? (
                        <div className="flex items-center gap-1">
                          <Building2 size={11} className="text-blue-500" />
                          <span>{dept.branch_name}</span>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {dept.tel_phone ? (
                        <div className="flex items-center gap-1">
                          <Phone size={11} className="text-blue-500" />
                          <span>{dept.tel_phone}</span>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar size={11} className="text-blue-500" />
                        <span>{dept.created_date ? new Date(dept.created_date).toLocaleDateString() : '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/departments/${dept.id}`} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Eye size={14} />
                        </Link>
                        <Link href={`/departments/${dept.id}/edit`} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Edit size={14} />
                        </Link>
                        <button onClick={() => { setSelectedDepartment(dept); setShowDeleteModal(true); }} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {departments.length === 0 && (
            <div className="text-center py-12">
              <Briefcase size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No departments found</p>
            </div>
          )}
        </div>

        {renderPagination()}

        {showDeleteModal && selectedDepartment && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Delete Department</h3>
                  <p className="text-xs text-slate-500">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-5">Are you sure you want to delete <strong className="text-red-600">{selectedDepartment.department_name}</strong>?</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowDeleteModal(false)} className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm">Cancel</button>
                <button onClick={() => handleDelete(selectedDepartment.id)} className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm flex items-center gap-2" disabled={deleting}>
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