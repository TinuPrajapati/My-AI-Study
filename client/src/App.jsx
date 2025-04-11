import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage';
import { Toaster } from "react-hot-toast"
import NotesPage from './pages/NotesPage';
import ChallengePage from './pages/ChallengePage';
import ProblemPage from './pages/ProblemPage';
import useAuthStore from './Store/useAuthStore';
import Loader from './components/Loader';
import useNotesStore from './Store/useNotesStroe';
import usePracticeStore from './Store/usePracticeStore';
import useRecordStore from './Store/useRecordStore';
import useTestStore from './Store/useTestStore';

function App() {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const {isLoading:authLoader} = useAuthStore();
  const {notesLoader} = useNotesStore();
  const {isLoading:problemLoader} = usePracticeStore();
  const {isLoading:recordLoader} = useRecordStore();
  const {isLoading:testLoader} = useTestStore();
  const [theme, setTheme] = React.useState("valentine");

  return (
    <Router>
      <div className="min-h-[100vh] flex flex-col " data-theme={theme}>
        {(authLoader || notesLoader || problemLoader || recordLoader || testLoader) && <Loader/>}
        <Navbar theme={theme} setTheme={setTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={authUser == null ? <Login /> : <Navigate to="/quiz" />} />
            <Route path="/signup" element={authUser == null ? <Signup /> : <Navigate to="/quiz" />} />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test/:id"
              element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NotesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/practice"
              element={
                <ProtectedRoute>
                  <ChallengePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/problem/:id"
              element={
                <ProtectedRoute>
                  <ProblemPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <footer className="bg-secondary text-white text-xl h-[12vh] font-bold flex items-center justify-center">
          <p>&copy; {new Date().getFullYear()} AI Test Platform. All rights reserved.</p>
        </footer>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;