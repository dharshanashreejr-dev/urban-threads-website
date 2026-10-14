import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAdminAuth, PortalRole } from '../context/AdminAuthContext';

export default function RequireAdminAuth({
  children,
  allowedRoles = ['admin']
}: {
  children: ReactNode;
  allowedRoles?: PortalRole[];
}) {
  const { isAuthenticated, role } = useAdminAuth();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  if (role && !allowedRoles.includes(role)) {
    // Logged in, but wrong portal for this role — bounce to their own home.
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/staff/dashboard'} replace />;
  }

  return <>{children}</>;
}
