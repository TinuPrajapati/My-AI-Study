import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from "react-hot-toast"
import useAuthStore from './Store/useAuthStore';
import Loader from './components/Loader';
import useNotesStore from './Store/useNotesStroe';
import usePracticeStore from './Store/usePracticeStore';
import useRecordStore from './Store/useRecordStore';
import Footer from './components/Footer';

function App() {
  const { isLoading: authLoader } = useAuthStore();
  const { notesLoader } = useNotesStore();
  const { isLoading: problemLoader } = usePracticeStore();
  const { isLoading: recordLoader } = useRecordStore();
  const [theme, setTheme] = React.useState("valentine");

  return (
    <div className="min-h-[100vh] flex flex-col font-Numtio" data-theme={theme}>
      {(authLoader || notesLoader || problemLoader || recordLoader ) && <Loader />}
      <Navbar theme={theme} setTheme={setTheme} />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;