import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';
import Google from "../../public/google.png";
import Github from "../../public/github.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please Enter Your Email');
      return;
    }

    if (!password) {
      setError('Please Enter Your Password');
      return;
    }

    login({ email, password }, navigate);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-[80vh] bg-secondary/25 flex flex-col justify-center items-center py-4">
      <h2 className="text-center text-3xl font-extrabold text-primary">
        Login
      </h2>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md bg-white py-4 px-8 rounded-lg">
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form className="space-y-2 flex flex-col items-center" onSubmit={handleSubmit}>
          <div className='w-full'>
            <label htmlFor="email" className="block text-[1rem] font-semibold pl-2 text-primary">
              Email address
            </label>
            <div className="mt-1 relative flex items-center">
              <Mail size={20} className="absolute left-2 text-primary" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your register Email'
                className="block w-full text-black font-bold pl-8 pr-3 py-1 text-[1rem] h-10 border-2 border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-none sm:text-sm"
              />
            </div>
          </div>

          <div className='w-full'>
            <label htmlFor="password" className="block text-[1rem] font-semibold pl-2 text-primary">
              Password
            </label>
            <div className="mt-1 relative flex items-center">
              <Lock size={20} className="absolute left-2 text-primary" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder='Enter your register password'
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full text-black font-bold pl-8 pr-3 py-1 text-[1rem] h-10 border-2 border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:ring-2 focus:border-none sm:text-sm"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-[50%] text-white bg-primary hover:bg-primary/80 font-bold rounded-md text-lg px-5 py-1.5 text-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <Link to="/signup" className="font-medium text-lg text-sky-400 hover:text-sky-600 w-full flex justify-center mt-2 border-t-2 pt-1 border-black">
          Create a new account
        </Link>
      </div>
      <div className="mt-4 flex flex-col items-center gap-3 sm:mx-auto sm:w-full sm:max-w-md">
        <button className='flex gap-4 justify-center items-center bg-white rounded-md w-full h-12'>
          <img src={Google} alt="Google Icon" className='size-6' />
          <p className="block text-[1rem] font-bold text-gray-700">Login with Google</p>
        </button>
        <button className='flex gap-4 justify-center items-center bg-white rounded-md w-full h-12'>
          <img src={Github} alt="Google Icon" className='size-6' />
          <p className="block text-[1rem] font-bold text-gray-700">Login with Github</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
