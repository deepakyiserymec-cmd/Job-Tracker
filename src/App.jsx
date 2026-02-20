import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';

// Lazy load pages or import directly
import Dashboard from './pages/Dashboard';
import JobTracker from './pages/JobTracker';
import Readiness from './pages/Readiness';
import ResumeBuilder from './pages/ResumeBuilder';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

function AppContent() {
  const { user } = useApp();

  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col items-center">
      <Navbar />
      <main className="container mx-auto">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/jobs" element={<JobTracker />} />
              <Route path="/prep" element={<Readiness />} />
              <Route path="/resume" element={<ResumeBuilder />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Signup />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
