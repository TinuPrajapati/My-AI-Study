import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff, Mail, Lock, UserRound } from "lucide-react";
import useAuthStore from "../Store/useAuthStore";
import Google from "../../public/google.png";
import Github from "../../public/github.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../api/Firebase";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading: loading } = useAuthStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const googleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { displayName, email, photoURL } = result.user;
    const password = Math.random().toString(36).slice(2);
    register({
      name: displayName,
      email: email,
      password: password
    }, navigate)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    register(formData, navigate)
  };

  return (
    <div className="min-h-[80vh] bg-secondary/25 flex flex-col justify-center items-center py-4">
      <h2 className=" text-center text-2xl font-extrabold text-gray-900">
        Create a new account
      </h2>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md bg-white py-4 px-8 rounded-lg">
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-[1rem] font-semibold pl-2 text-gray-700">
              Full name
            </label>
            <div className="relative flex items-center">
              <UserRound size={20} className="absolute left-2 text-sky-400" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
                className="block w-full pl-8 pr-10 py-1 text-[1rem] h-10 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:ring-2 focus:border-none sm:text-sm"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-[1rem] font-semibold pl-2 text-gray-700">
              Email address
            </label>
            <div className="relative flex items-center">
              <Mail size={20} className="absolute left-2 text-sky-400" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-8 pr-10 py-1 text-[1rem] h-10 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:ring-2 focus:border-none sm:text-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="">
            <label htmlFor="password" className="block text-[1rem] font-semibold pl-2 text-gray-700">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={20} className="absolute left-2 text-sky-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password at least 6 character long"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-8 pr-10 py-1 text-[1rem] h-10 border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:ring-2 focus:border-none sm:text-sm"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-2 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-sky-400" />
                ) : (
                  <Eye size={20} className="text-sky-400" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
        <Link
          to="/login"
          className="font-medium text-lg text-sky-400 hover:text-sky-600 w-full flex justify-center mt-2 border-t-2 pt-1 border-black"
        >
          Login to your existing account
        </Link>
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 sm:mx-auto sm:w-full sm:max-w-md">
        <button onClick={googleSignUp} className='flex gap-4 justify-center items-center bg-white rounded-md w-full h-12'>
          <img src={Google} alt="Google Icon" className='size-6' />
          <p className="block text-[1rem] font-bold text-gray-700">Login with Google</p>
        </button>
        {/* <button className='flex gap-4 justify-center items-center bg-white rounded-md w-full h-12'>
          <img src={Github} alt="Google Icon" className='size-6' />
          <p className="block text-[1rem] font-bold text-gray-700">Login with Github</p>
        </button> */}
      </div>
    </div>
  );
};

export default Signup;
