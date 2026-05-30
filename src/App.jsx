import { Routes, Route, Navigate } from 'react-router-dom';
import { ClaimsProvider } from './context/ClaimsContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SubmitClaimPage from './pages/SubmitClaimPage';
import DashboardPage from './pages/DashboardPage';
import ClaimDetailPage from './pages/ClaimDetailPage';
import ReviewerDashboard from './pages/ReviewerDashboard';

function AppLayout({ children }) {
  return (
    <div className="bg-app-shell">
      <AppHeader />
      <main className="pt-16">{children}</main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <LandingPage />
          </AppLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AppLayout>
            <LoginPage />
          </AppLayout>
        }
      />
      <Route
        path="/submit"
        element={
          <AppLayout>
            <ProtectedRoute>
              <SubmitClaimPage />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      <Route
        path="/claim/:id"
        element={
          <AppLayout>
            <ProtectedRoute>
              <ClaimDetailPage />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      <Route
        path="/reviewer"
        element={
          <AppLayout>
            <ProtectedRoute>
              <ReviewerDashboard />
            </ProtectedRoute>
          </AppLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ClaimsProvider>
            <AppRoutes />
          </ClaimsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
