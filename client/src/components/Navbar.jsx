import React,{useEffect,useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';
import Logo from "../../public/online-test.png"

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "fantasy",
  "dracula",
  "cmyk",
  "autumn",
  "acid",
  "lemonade",
  "night",
  "winter",
  "dim",
  "sunset",
];

const Navbar = ({ theme, setTheme }) => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-secondary text-white shadow-md flex justify-between items-center h-[10vh] px-5 py-1 overflow-x-hidden">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
        <img src={Logo} alt="Logo" className="w-8 h-8" />
        <span >AI Test Platform</span>
      </Link>

      <div className="flex items-center gap-2 h-full text-lg">
        <button
          onClick={() => setShow(!show)}
          className="hover:bg-primary/80 font-semibold transition-colors px-4 py-1 rounded-md active:scale-90" >
          Theme
        </button>
        {/* theme dropdown */}
        <div ref={dropdownRef} className={`absolute z-40 top-16 p-2 ${show ? "opacity-100" : " opacity-0"} space-y-1  duration-500 w-[18vw] h-[50vh] overflow-y-auto rounded bg-secondary/50 backdrop-blur-3xl`}>
          {THEMES.map((t, index) => (
            <button
              key={index}
              className={` w-full group flex flex-col items-center gap-1 p-2 rounded transition-colors ${theme === t ? "bg-accent" : "hover:bg-base-200/50"}`}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded overflow-hidden bg-white grid grid-cols-4 gap-1 py-1 px-2" data-theme={t}>
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>
              <span className=" font-bold text-base-content w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
        {authUser ? (
          <>
            <Link to="/quiz" className="hover:bg-primary/80 font-semibold transition-colors px-4 py-1 rounded-md active:scale-90" >
              Quiz
            </Link>
            <Link to="/practice" className="hover:bg-primary/80 font-semibold transition-colors px-4 py-1 rounded-md active:scale-90" >
              Practice
            </Link>
            <Link to="/notes" className="hover:bg-primary/80 font-semibold transition-colors px-4 py-1 rounded-md active:scale-90" >
              Notes
            </Link>
            <button
              onClick={() => logout(navigate)}
              className="bg-red-500 text-white flex gap-1 items-center px-4 py-1 font-bold rounded-md transition-colors active:scale-90"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:bg-primary/80 font-semibold transition-colors px-4 py-1 rounded-md active:scale-90" >
              Home
            </Link>
            <Link
              to="/Login"
              className="bg-white text-primary px-4 py-1 font-semibold rounded-md transition-colors active:scale-90"
            >
              Login/Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;