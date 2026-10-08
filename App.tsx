import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from './store/appStore';

// Layouts
import { AppLayout } from './layouts/AppLayout';

// Public Pages
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';

// Protected Pages
import { DashboardPage } from './pages/Dashboard';
import { OnboardingPage } from './pages/Onboarding';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzer';
import { GitHubAnalyzerPage } from './pages/GitHubAnalyzer';
import { CareerPathsPage } from './pages/CareerPaths';
import { SkillGapPage } from './pages/SkillGap';
import { RoadmapPage } from './pages/Roadmap';
import { CoursesPage } from './pages/Courses';
import { ProjectsPage } from './pages/Projects';
import { MockInterviewPage } from './pages/MockInterview';
import { InterviewResultsPage } from './pages/InterviewResults';
import { JobReadinessPage } from './pages/JobReadiness';
import { CareerCoachPage } from './pages/CareerCoach';
import { ProfilePage } from './pages/Profile';
import { SettingsPage } from './pages/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontSize: '14px', maxWidth: '400px' }
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Onboarding (separate from main app layout) */}
        <Route path="/onboarding" element={<PrivateRoute><OnboardingPage /></PrivateRoute>} />

        {/* Protected App Routes */}
        <Route path="/dashboard" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="resume" element={<ResumeAnalyzerPage />} />
          <Route path="github" element={<GitHubAnalyzerPage />} />
          <Route path="career" element={<CareerPathsPage />} />
          <Route path="skills" element={<SkillGapPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="interview" element={<MockInterviewPage />} />
          <Route path="interview/results/:id" element={<InterviewResultsPage />} />
          <Route path="job-readiness" element={<JobReadinessPage />} />
          <Route path="coach" element={<CareerCoachPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
