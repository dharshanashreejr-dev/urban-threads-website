import { createContext, useContext, useState, ReactNode } from 'react';

// Demo-only credentials. In production this must be replaced with a real
// backend-authenticated login (JWT/session) — never ship hardcoded creds.
export type PortalRole = 'admin' | 'staff';

type PortalUser = {
  username: string;
  password: string;
  role: PortalRole;
  staffId?: 1 | 2;
  displayName: string;
};

const PORTAL_USERS: PortalUser[] = [
  { username: 'admin', password: 'urban2026', role: 'admin', displayName: 'Admin' },
  { username: 'staff1', password: 'staff1pack', role: 'staff', staffId: 1, displayName: 'Staff 1 — Packaging' },
  { username: 'staff2', password: 'staff2pack', role: 'staff', staffId: 2, displayName: 'Staff 2 — Packaging' }
];

type AdminAuthContextType = {
  isAuthenticated: boolean;
  role: PortalRole | null;
  staffId: 1 | 2 | null;
  displayName: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const SESSION_KEY = 'urbanthreads_admin_auth';

function readSession(): { role: PortalRole; staffId: 1 | 2 | null; displayName: string } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState(() => readSession());

  function login(username: string, password: string) {
    const match = PORTAL_USERS.find(
      (u) => u.username === username.trim().toLowerCase() && u.password === password
    );
    if (match) {
      const sessionData = {
        role: match.role,
        staffId: match.staffId ?? null,
        displayName: match.displayName
      };
      setSession(sessionData);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      return true;
    }
    return false;
  }

  function logout() {
    setSession(null);
    sessionStorage.removeItem(SESSION_KEY);
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated: !!session,
        role: session?.role ?? null,
        staffId: session?.staffId ?? null,
        displayName: session?.displayName ?? null,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
