import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut, Menu } from 'lucide-react'; // Added Menu icon
import useAuthStore from '../Store/useAuthStore';
import Logo from "../../public/logo2.jpeg";

const THEMES = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "synthwave", "retro",
    "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "fantasy",
    "dracula", "cmyk", "autumn", "acid", "lemonade", "night", "winter", "dim", "sunset"
];

const Navbar = ({ theme, setTheme }) => {
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false); // New state for mobile menu
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
        <nav className="bg-secondary text-white shadow-md flex justify-between items-center h-[8vh] sm:h-[10vh] px-5 py-1 overflow-x-hidden">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                <img src={Logo} alt="Logo" className="size-7" />
                <span>My AI Study</span>
            </Link>

            {authUser ?
                <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className=" p-2 rounded-md hover:bg-primary/80 transition-colors"
                >
                    <Menu size={24} />
                </button>
                :
                <Link
                    to="/Login"
                    className="bg-white  text-primary text-[0.9rem] px-4 py-1 font-semibold rounded-md transition-colors"
                >
                    Login/Signup
                </Link>
            }
            <div className="flex items-center gap-2 h-full text-lg">

                {mobileMenu && (
                    <div className=" absolute top-[10vh] left-0 w-full bg-secondary/80 p-4 space-y-2">
                        <button
                            onClick={() => setShow(!show)}
                            className=" hover:bg-primary/80 font-semibold transition-colors px-4 py-1 rounded-md active:scale-90"
                        >
                            Theme
                        </button>
                        <div
                            ref={dropdownRef}
                            className={`absolute z-40 top-16 p-2 ${show ? "opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none"} space-y-1  duration-500 w-[18vw] h-[50vh] overflow-y-auto rounded bg-secondary/50 backdrop-blur-3xl`}
                        >
                            {THEMES.map((t, index) => (
                                <button
                                    key={index}
                                    className={`w-full group flex flex-col items-center gap-1 p-2 rounded transition-colors ${theme === t ? "bg-accent/30 backdrop-blur-xl" : "hover:bg-base-200/50"}`}
                                    onClick={() => setTheme(t)}
                                >
                                    <div className="relative h-8 w-full rounded overflow-hidden bg-white grid grid-cols-4 gap-1 py-1 px-2" data-theme={t}>
                                        <div className="rounded bg-primary"></div>
                                        <div className="rounded bg-secondary"></div>
                                        <div className="rounded bg-accent"></div>
                                        <div className="rounded bg-neutral"></div>
                                    </div>
                                    <span className="font-bold text-neutral w-full text-center">
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <Link
                            to="/quiz"
                            className="block text-lg font-semibold hover:bg-primary/80 px-4 py-1 rounded-md"
                        >
                            Quiz
                        </Link>
                        <Link
                            to="/practice"
                            className="block text-lg font-semibold hover:bg-primary/80 px-4 py-1 rounded-md"
                        >
                            Practice
                        </Link>
                        <Link
                            to="/notes"
                            className="block text-lg font-semibold hover:bg-primary/80 px-4 py-1 rounded-md"
                        >
                            Notes
                        </Link>
                        <button
                            onClick={() => logout(navigate)}
                            className="bg-red-500 text-white flex gap-1 items-center px-4 py-1 font-bold rounded-md transition-colors"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </nav >
    );
};

export default Navbar;
