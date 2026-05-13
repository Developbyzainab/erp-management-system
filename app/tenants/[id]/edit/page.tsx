'use client';

import { useState, useEffect } from 'react';
import TenantForm from '../../components/TenantForm';

export default function EditTenantPage({ params }: { params: Promise<{ id: string }> }) {
  const [tenantId, setTenantId] = useState<string | null>(null);

  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      setTenantId(id);
    };
    getId();
  }, [params]);

  if (!tenantId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <TenantForm mode="edit" tenantId={tenantId} />;
}