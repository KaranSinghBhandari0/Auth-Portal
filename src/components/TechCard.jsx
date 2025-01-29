import React from 'react';
import { Link } from 'react-router-dom';

export default function TechCard({ image, title, description }) {
    return (
        <div className='relative w-[250px] h-[270px] border p-4 rounded-xl shadow-xl overflow-hidden group'>
            <div className="absolute inset-0 bg-primary transform translate-y-[105%] group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
            <div className='relative z-10'>
                <img src={image} alt={title} className='w-12 h-12 mx-auto my-4' />

                <p className='text-xl text-tertiary font-semibold group-hover:text-white transition-colors duration-500'>{title}</p>
                <p className='text-tertiary group-hover:text-white transition-colors duration-500'>{description}</p>

                <Link to='/' className='flex items-center justify-center gap-2 mt-8 text-tertiary p-2 rounded-lg group-hover:text-white transition-colors duration-500' onClick={() => { scroll(0, 0) }}>
                    <p>Read More</p>
                    <i className="fa-solid fa-arrow-right mt-1 group-hover:text-white"></i>
                </Link>
            </div>
        </div>
    );
}
