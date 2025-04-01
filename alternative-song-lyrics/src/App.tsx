import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabaseClient';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { DetailedSongPage } from './pages/DetailedSongPage';
import { AdminPage } from './pages/admin/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { BASE_URL } from './constant';
import path from 'path'
const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to={path.join(BASE_URL, "/auth")} />;
  }

  return <>{children}</>;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path={path.join(BASE_URL, "/")} element={<HomePage />} />
          <Route path={path.join(BASE_URL, "/song/:id")} element={<DetailedSongPage />} />
          <Route
            path={path.join(BASE_URL, "/admin")}
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path={path.join(BASE_URL, "/about")} element={<AboutPage />} />
          <Route path={path.join(BASE_URL, "/privacy")} element={<PrivacyPolicyPage />} />
          <Route path={path.join(BASE_URL, "/auth")} element={<AuthPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
