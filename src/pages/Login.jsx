import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {

    const { login, isLoggingIn, handleGoogleSignIn } = useContext(AuthContext);

    const [showPass, setShowPass] = useState(false);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const togglePassword = () => {
        setShowPass(!showPass);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email,password);
    };

    return (
        <div className='flex flex-col md:flex-row w-full bg-white rounded-3xl shadow-2xl overflow-hidden mb-32' data-aos='flip-left'>
            {/* Left Side - Banner */}
            <div className='hidden md:flex w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 justify-center items-center p-8'>
                <img src='/login-banner.png' alt='Login Banner' className='max-w-full h-auto rounded-lg' />
            </div>

            {/* Right Side - Form */}
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-8'>
                <h2 className='text-4xl font-bold text-gray-800 mb-4'>Login</h2>
                <p className='text-gray-500 mb-8 text-center max-w-sm cursor-pointer'>Login to access your account and continue where you left off.</p>

                <form className='w-full max-w-sm cursor-pointer space-y-6' onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-bg-blue-500 peer placeholder-transparent'
                            required
                            placeholder='Email'
                        />
                        <label htmlFor="email" className='absolute left-4 -top-3 bg-white px-1 text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:bg-white peer-focus:px-1'>
                            Email
                        </label>
                        <i className="fa-solid fa-envelope text-stone-700 absolute right-4 top-5"></i>
                    </div>

                    <div className="relative">
                        <input
                            type={showPass ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-bg-blue-500 peer placeholder-transparent'
                            required
                            placeholder='Password'
                        />
                        <label htmlFor="password" className='absolute left-4 -top-3 bg-white px-1 text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:bg-white peer-focus:px-1'>
                            Password
                        </label>
                        <img
                            onClick={togglePassword}
                            src={!showPass ? '/hide.png' : '/show.png'}
                            className="h-6 w-6 absolute top-4 right-4 cursor-pointer"
                            alt="Toggle password visibility"
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-lg text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out hover:scale-105 shadow-md'
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className='flex justify-center items-center gap-4 py-4 mt-4'>
                    <img src='/google.png' className='w-10 h-10 rounded-full p-2 border transition-all hover:bg-neutral-300 shadow-sm cursor-pointer' onClick={handleGoogleSignIn} />
                    <img src='/apple-logo.png' className='w-10 h-10 rounded-full p-2 border transition-all hover:bg-neutral-300 shadow-sm cursor-pointer' />
                    <img src='/github.png' className='w-10 h-10 rounded-full p-2 border transition-all hover:bg-neutral-300 shadow-sm cursor-pointer' />
                    <img src='/twitter.png' className='w-10 h-10 rounded-full p-2 border transition-all hover:bg-neutral-300 shadow-sm cursor-pointer' />
                </div>

                <p className='text-center mt-6 text-gray-500'>
                    Don't have an account? <Link to='/signup' className='text-primary font-semibold'>Signup</Link>
                </p>
                <Link to='/forgot-password' className='text-center mt-2 text-sm cursor-pointer text-blue-600'>Forgot Password?</Link>
            </div>
        </div>
    );
}
