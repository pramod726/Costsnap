import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setIsLoggingIn(true);
    try {
      const response = await fetch(`${SERVER_URL}/usersignup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success('Signup Successful');
      console.log('Signup successful:', data);

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error('Signup failed:', err.message);
      setError('Signup failed');
      toast.error('Error logging in. Please try again later');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white px-4">
      <div className="w-full max-w-sm p-6 space-y-6 bg-gray-950 border border-[#3c4753] rounded-lg">
        <h1 className="text-2xl font-bold text-center">Signup</h1>
        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="space-y-4">
          <label className="block">
            <p className="text-md pb-1">First Name</p>
            <input
              className="w-full py-2 px-3 text-sm rounded-md bg-[#1c2126] border border-[#3c4753] focus:outline-none focus:border-gray-300 placeholder:text-gray-500 placeholder:text-sm"
              type="text"
              placeholder="Enter your first name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="block">
            <p className="text-md pb-1">Last Name</p>
            <input
              className="w-full py-2 px-3 text-sm rounded-md bg-[#1c2126] border border-[#3c4753] focus:outline-none focus:border-gray-300 placeholder:text-gray-500 placeholder:text-sm"
              type="text"
              placeholder="Enter your last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="block">
            <p className="text-md pb-1">Username</p>
            <input
              className="w-full py-2 px-3 text-sm rounded-md bg-[#1c2126] border border-[#3c4753] focus:outline-none focus:border-gray-300 placeholder:text-gray-500 placeholder:text-sm"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>

          <label className="block">
            <p className="text-md pb-1">Email</p>
            <input
              className="w-full py-2 px-3 text-sm rounded-md bg-[#1c2126] border border-[#3c4753] focus:outline-none focus:border-gray-300 placeholder:text-gray-500 placeholder:text-sm"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            <p className="text-md pb-1">Password</p>
            <div className="relative">
              <input
                className="w-full py-2 px-3 text-sm rounded-md bg-[#1c2126] border border-[#3c4753] focus:outline-none focus:border-gray-300 placeholder:text-gray-500 placeholder:text-sm"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9dabb8] focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </label>
        </div>

        <button
          className={`w-full py-2 rounded-md text-gray-950 font-bold transition ${isLoggingIn ? "bg-green-500" : "bg-gray-100"}`}
          onClick={handleSignup}
        >
          Signup
        </button>

        <p className="text-center text-sm underline text-[#9dabb8]">
          <Link to="/login">Already have an account? Log in</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
