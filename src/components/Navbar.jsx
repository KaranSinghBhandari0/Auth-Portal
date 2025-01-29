import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {

    const { user, logout } = useContext(AuthContext);

    return (
        <div className='w-full max-w-[400px] mx-auto p-4 mb-8 rounded-b-3xl flex justify-center items-center gap-4 shadow-xl'>
            <Link to='/' className='text-stone-500 px-2 py-1 rounded-xl hover:bg-secondary hover:text-white'>
                Home
            </Link>
            <Link to='/' className='text-stone-500 px-2 py-1 rounded-xl hover:bg-secondary hover:text-white'>
                About
            </Link>
            {
                user ?
                    <Link to='/profile' className='text-stone-500 px-2 py-1 rounded-xl hover:bg-secondary hover:text-white'>
                        Profile
                    </Link>
                    :
                    <Link to='/' className='text-stone-500 px-2 py-1 rounded-xl hover:bg-secondary hover:text-white'>
                        Services
                    </Link>
            }
            {
                user ?
                    <p className='text-stone-500 px-2 py-1 rounded-xl hover:bg-secondary hover:text-white cursor-pointer' onClick={() => logout()}>
                        Logout
                    </p>
                    :
                    <Link to='/login' className='text-stone-500 px-2 py-1 rounded-xl hover:bg-secondary hover:text-white'>
                        Login
                    </Link>
            }
        </div>
    )
}
