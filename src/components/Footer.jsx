import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='border border-2 border-secondary border-b-0 rounded-t-[100px] mt-16 px-16 text-center py-6'>
            <div className='flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-evenly mb-6'>
                <div className='flex flex-col items-center md:items-start gap-2'>
                    <p className='text-tertiary text-2xl font-semibold mb-3'>Links</p>
                    <Link to='/' onClick={() => { scroll(0, 0) }} className='text-tertiary'>Home</Link>
                    <Link to='/' onClick={() => { scroll(0, 0) }} className='text-tertiary'>About</Link>
                    <Link to='/' onClick={() => { scroll(0, 0) }} className='text-tertiary'>Contact US</Link>
                </div>
                <div className='flex flex-col gap-2'>
                    <Link to='/' onClick={() => { scroll(0, 0) }} className="fa-brands fa-twitter text-blue-500 text-2xl cursor-pointer transition duration-500 ease-in-out hover:translate-x-[6px]"></Link>
                    <Link to='/' onClick={() => { scroll(0, 0) }} className="fa-brands fa-linkedin text-blue-700 text-2xl cursor-pointer transition duration-500 ease-in-out hover:translate-x-[6px]"></Link>
                    <Link to='/' onClick={() => { scroll(0, 0) }} className="fa-brands fa-instagram text-[#e1306c] text-2xl cursor-pointer transition duration-500 ease-in-out hover:translate-x-[6px]"></Link>
                </div>
                <div className='flex flex-col items-center md:items-start gap-2'>
                    <p className='text-tertiary text-2xl font-semibold mb-3'>Address</p>
                    <p className='text-tertiary'><i className="fa-solid fa-location-pin"></i> Location</p>
                    <p className='text-tertiary'><i className="fa-solid fa-phone text-green-500"></i> +91 9563224720</p>
                    <p className='text-tertiary'><i className="fa-solid fa-envelope text-orange-500"></i> demo@gmail.com</p>
                </div>
            </div>
            <p className='text-tertiary' >© 2025 All Rights Reserved By Karan</p>
        </div>
    )
}
