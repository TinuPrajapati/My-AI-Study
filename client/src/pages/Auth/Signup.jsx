import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff, Mail, Lock, UserRound } from "lucide-react";
import useAuthStore from "../../Store/useAuthStore";
import Google from "../../../public/google.png";
import Github from "../../../public/github.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../api/Firebase";

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
    <div className="min-h-[80vh] bg-secondary/25 flex flex-col justify-center items-center py-10">
      <h2 className="text-center text-3xl font-bold text-primary">
        Create a new account
      </h2>

      <div className="mt-4 w-[80%] sm:w-[40%]  bg-white py-4 px-8 rounded-md">
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="w-full">
            <label htmlFor="name" className="block text-[1rem] font-semibold pl-2 text-primary">
              Full name
            </label>
            <div className="relative flex items-center">
              <UserRound size={20} className="absolute left-2 text-accent" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your Name"
                className="block w-full text-black font-semibold pl-8 pr-3 py-1 text-[1rem] h-10 border-2 border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-none sm:text-sm"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="w-full">
            <label htmlFor="email" className="block text-[1rem] font-semibold pl-2 text-primary">
              Email address
            </label>
            <div className="relative flex items-center">
              <Mail size={20} className="absolute left-2 text-accent" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full text-black font-semibold pl-8 pr-3 py-1 text-[1rem] h-10 border-2 border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-none sm:text-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="w-full">
            <label htmlFor="password" className="block text-[1rem] font-semibold pl-2 text-primary">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={20} className="absolute left-2 text-accent" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password at least 6 character long"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full text-black font-semibold pl-8 pr-3 py-1 text-[1rem] h-10 border-2 border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-none sm:text-sm"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-2 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-accent" />
                ) : (
                  <Eye size={20} className="text-accent" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[60%] text-white bg-primary hover:bg-primary/80 font-bold rounded-md text-xl sm:text-lg px-5 py-1.5 text-center"
          >
            Sign Up
          </button>
        </form>
        <Link
          to="/login"
          className="font-medium text-lg text-sky-400 hover:text-sky-600 w-full flex justify-center mt-4 border-t-2 pt-2 border-black"
        >
          Login to your existing account
        </Link>
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 w-[60%] sm:w-[40%]">
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
