import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/** Redirects unauthenticated users to /login */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null; // wait for Firebase to resolve auth state

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

/** Redirects already-authenticated users away from auth pages (e.g. /login) */
export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) return <Navigate to="/home" replace />;

  return <>{children}</>;
}
