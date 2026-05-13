'use client';

import { useState, useEffect } from 'react';
import DepartmentForm from '../../components/DepartmentForm';

export default function EditDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const [departmentId, setDepartmentId] = useState<string | null>(null);

  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      setDepartmentId(id);
    };
    getId();
  }, [params]);

  if (!departmentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <DepartmentForm mode="edit" departmentId={departmentId} />;
}