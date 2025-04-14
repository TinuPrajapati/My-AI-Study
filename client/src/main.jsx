import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import { CodePracticePage, LandingPage, Login, NotesPage, ProblemPage, QuizPage, QuizResult, QuizTestPage, Signup } from './pages';


const Router = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route path='' element={<LandingPage />} />
        <Route path="/login" element={authUser == null ? <Login /> : <Navigate to="/quiz" />} />
        <Route path="/signup" element={authUser == null ? <Signup /> : <Navigate to="/quiz" />} />
        <Route path='/quiz' element={<QuizPage />} />
        <Route path='/test/:id' element={<QuizTestPage />} />
        <Route path='/quiz_result/:id' element={<QuizResult />} />
        <Route path='/practice' element={<CodePracticePage />} />
        <Route path='/problem/:id' element={<ProblemPage />} />
        <Route path='/notes' element={<NotesPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
