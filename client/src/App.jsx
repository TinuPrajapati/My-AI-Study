import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from "react-hot-toast"
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = React.useState("valentine");

  return (
    <div className="min-h-[100vh] flex flex-col font-Numtio" data-theme={theme}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;