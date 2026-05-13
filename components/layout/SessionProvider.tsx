// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';

// interface User {
//   user_id: number;
//   user_name: string;
//   email: string;
//   tenant_id: number;
//   company_id: number;
//   branch_id: number;
//   user_designation?: string;
//   emp_id?: number;
//   profile_image_url?: string;
// }

// interface SessionContextType {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
//   signUp: (user_name: string, email: string, password: string, tenant_id: number, company_id: number, branch_id: number) => Promise<{ success: boolean; error?: string }>;
//   signOut: () => Promise<void>;
// }

// const SessionContext = createContext<SessionContextType | undefined>(undefined);

// export function SessionProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('/api/auth/me')
//       .then(res => res.json())
//       .then(data => setUser(data.user))
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false));
//   }, []);

//   const signIn = async (email: string, password: string) => {
//     const res = await fetch('/api/auth/signin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });
//     const data = await res.json();
//     if (res.ok && data.user) {
//       setUser(data.user);
//       return { success: true };
//     }
//     return { success: false, error: data.error };
//   };

//   const signUp = async (user_name: string, email: string, password: string, tenant_id: number, company_id: number, branch_id: number) => {
//     const res = await fetch('/api/auth/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ user_name, email, password, tenant_id, company_id, branch_id })
//     });
//     const data = await res.json();
//     if (res.ok && data.user) {
//       // Auto signin after signup
//       return await signIn(email, password);
//     }
//     return { success: false, error: data.error };
//   };

//   const signOut = async () => {
//     await fetch('/api/auth/logout', { method: 'POST' });
//     setUser(null);
//   };

//   return (
//     <SessionContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
//       {children}
//     </SessionContext.Provider>
//   );
// }

// export function useSession() {
//   const context = useContext(SessionContext);
//   if (!context) throw new Error('useSession must be used within SessionProvider');
//   return context;
// }



'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  user_id: number;
  user_name: string;
  email: string;
  tenant_id: number;
  company_id: number;
  branch_id: number;
  user_designation?: string;
  emp_id?: number;
  profile_image_url?: string;
}

interface SessionContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (user_name: string, email: string, password: string, tenant_id: number, company_id: number, branch_id: number) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

let inactivityTimer: NodeJS.Timeout;

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    if (user) {
      inactivityTimer = setTimeout(() => {
        signOut();
        router.push('/signin?session=expired');
      }, 20 * 60 * 1000); // 20 minutes
    }
  };

  // Track user activity
  useEffect(() => {
    if (!user) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const resetTimer = () => resetInactivityTimer();
    
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetInactivityTimer();
    
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [user]);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok && data.user) {
      setUser(data.user);
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const signUp = async (user_name: string, email: string, password: string, tenant_id: number, company_id: number, branch_id: number) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_name, email, password, tenant_id, company_id, branch_id })
    });
    const data = await res.json();
    if (res.ok && data.user) {
      return await signIn(email, password);
    }
    return { success: false, error: data.error };
  };

  const signOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    if (inactivityTimer) clearTimeout(inactivityTimer);
  };

  return (
    <SessionContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
}