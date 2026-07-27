import React, { useState } from 'react';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('backend data', result);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zepto-purple-50 via-white to-zepto-purple-100 px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <form
        className="w-full max-w-md rounded-[28px] border border-zepto-purple-100 bg-white/90 p-8 shadow-[0_20px_60px_rgba(149,14,219,0.12)] backdrop-blur-xl flex flex-col items-center"
        onSubmit={signupSubmit}
      >
        {/* Heading */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-zepto-purple text-xl font-extrabold text-white shadow-lg shadow-zepto-purple/20">
            Z
          </div>
          <h1 className="text-3xl font-bold text-zepto-purple">Create Account</h1>
          <p className="mt-2 text-sm text-zepto-gray-light">Join Zepto for fast grocery delivery</p>
        </div>

        <input
          name={name}
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-12 rounded-full border border-gray-200 bg-zepto-gray-bg px-5 mb-4 text-gray-800 placeholder:text-gray-400 outline-none focus:border-zepto-purple focus:ring-2 focus:ring-zepto-purple-50"
        />

        <input
          name={email}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 rounded-full border border-gray-200 bg-zepto-gray-bg px-5 mb-4 text-gray-800 placeholder:text-gray-400 outline-none focus:border-zepto-purple focus:ring-2 focus:ring-zepto-purple-50"
        />

        <input
          name={password}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 rounded-full border border-gray-200 bg-zepto-gray-bg px-5 mb-5 text-gray-800 placeholder:text-gray-400 outline-none focus:border-zepto-purple focus:ring-2 focus:ring-zepto-purple-50"
        />

        <div className="w-full flex items-center justify-between mb-6 text-sm text-zepto-gray">
          <div className="flex items-center gap-2">
            <input id="remember" type="checkbox" className="accent-zepto-purple" />
            <label htmlFor="remember" className="cursor-pointer">
              Remember me
            </label>
          </div>

          <a href="#" className="font-medium text-zepto-purple transition hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-14 rounded-full bg-gradient-to-r from-zepto-purple to-zepto-purple-light text-white text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(149,14,219,0.25)]"
        >
          Sign Up
        </button>

        {/* Register */}
        <div className="mt-5 flex items-center gap-2 text-sm text-zepto-gray-light">
          <p>Already have an account?</p>

          <a href="#" className="font-semibold text-zepto-purple hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;