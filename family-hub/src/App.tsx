import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { FamilyProvider } from './contexts/FamilyContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { FamilyProgressProvider } from './contexts/FamilyProgressContext';
import { SentryErrorBoundary } from './lib/sentry';
import AppShell from './app/components/AppShell';
import DashboardScreen from './app/screens/DashboardScreen';
import KidsScreen from './app/screens/KidsScreen';
import ActivitiesScreen from './app/screens/ActivitiesScreen';
import ProgressScreen from './app/screens/ProgressScreen';
import SettingsScreen from './app/screens/SettingsScreen';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FamilyProvider>
          <ProgressProvider>
            <FamilyProgressProvider>
              <Router>
                <SentryErrorBoundary fallback={<div>Something went wrong. Please refresh the page.</div>}>
                  <div className="App">
                    <Routes>
                      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
                      <Route path="/app" element={<AppShell />}>
                        <Route index element={<Navigate to="/app/dashboard" replace />} />
                        <Route path="dashboard" element={<DashboardScreen />} />
                        <Route path="kids" element={<KidsScreen />} />
                        <Route path="activities" element={<ActivitiesScreen />} />
                        <Route path="progress" element={<ProgressScreen />} />
                        <Route path="settings" element={<SettingsScreen />} />
                      </Route>
                      {/* Catch-all redirect to dashboard */}
                      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                    </Routes>
                  </div>
                </SentryErrorBoundary>
              </Router>
            </FamilyProgressProvider>
          </ProgressProvider>
        </FamilyProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

