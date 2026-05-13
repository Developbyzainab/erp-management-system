'use client';

import { useState, useEffect } from 'react';
import BranchForm from '../components/BranchForm';

export default function ViewBranchPage({ params }: { params: Promise<{ id: string }> }) {
  const [branchId, setBranchId] = useState<string | null>(null);

  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      setBranchId(id);
    };
    getId();
  }, [params]);

  if (!branchId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <BranchForm mode="view" branchId={branchId} />;
}