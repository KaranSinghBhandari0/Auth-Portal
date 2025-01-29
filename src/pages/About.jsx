import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className='max-w-7xl mx-auto bg-primary min-h-[85vh] rounded-br-[250px] rounded-tl-[250px] mt-24 py-12 px-8' data-aos="zoom-in">

            <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12' id='child1'>
                {/* Text Section */}
                <div className='w-full max-w-[400px] lg:max-w-[500px] flex flex-col items-center lg:items-start justify-center gap-4 text-center lg:text-left' id='child2'>
                    <p className='text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
                        About Us
                    </p>
                    <p className='text-white text-sm sm:text-base lg:text-lg leading-relaxed w-[90%] sm:w-[80%] lg:w-full'>
                        We are a passionate team dedicated to delivering exceptional products and services. With a focus on innovation and customer satisfaction.
                    </p>
                    <Link to="/" onClick={() => { scroll(0, 0) }} className='bg-secondary text-white text-lg py-2 px-8 rounded-lg text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
                        Read More
                    </Link>
                </div>

                {/* Image Section */}
                <div className='flex justify-center'>
                    <img
                        src="/about-img.png"
                        alt="About Us"
                        className='w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] object-contain'
                    />
                </div>
            </div>
        </div>
    );
}
