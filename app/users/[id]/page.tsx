'use client';

import { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';  // ✅ Yeh sahi path hai

export default function ViewUserPage({ params }: { params: Promise<{ id: string }> }) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      setUserId(id);
    };
    getId();
  }, [params]);

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <UserForm mode="view" userId={userId} />;
}