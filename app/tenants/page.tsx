import pool from '@/lib/db';
import Link from 'next/link';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { deleteTenant } from '../actions/tenant';

export default async function TenantsPage() {
  let tenants: any[] = [];
  let errorMsg = '';
  try {
    const result = await pool.query('SELECT * FROM erp_tenantes ORDER BY created_date DESC');
    tenants = result.rows;
  } catch (error: any) {
    console.error('Error fetching tenants:', error);
    errorMsg = error.message;
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Tenants</h1>
        <Link 
          href="/tenants/create" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          Create Tenant
        </Link>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-red-700 rounded shadow-sm">
          <p className="font-bold">Error loading data</p>
          <p>{errorMsg}</p>
          <p className="text-sm mt-2 text-red-600">Make sure your database connection is correct in .env file and the table exists.</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">Name</th>
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">Code</th>
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">Email</th>
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">Mobile</th>
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.length === 0 && !errorMsg ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <p className="mb-4">No tenants found.</p>
                      <Link 
                        href="/tenants/create" 
                        className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                      >
                        Create your first tenant
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                tenants.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50/60 dark:hover:bg-blue-900/20 hover:shadow-sm transition-all duration-200 group">
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{tenant.tenant_name}</td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600/80 dark:group-hover:text-blue-300 transition-colors">{tenant.tenant_code || '-'}</td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600/80 dark:group-hover:text-blue-300 transition-colors">{tenant.email || '-'}</td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600/80 dark:group-hover:text-blue-300 transition-colors">{tenant.mobile || '-'}</td>

                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-3">
                        <Link 
                          href={`/tenants/${tenant.id}`} 
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link 
                          href={`/tenants/${tenant.id}/edit`} 
                          className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <form action={async () => {
                          'use server'
                          await deleteTenant(tenant.id)
                        }}>
                          <button 
                            type="submit" 
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
