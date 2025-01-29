import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

export default function HeroSection() {

    const { user } = useContext(AuthContext)

    return (
        <div className='max-w-7xl mx-auto bg-primary min-h-[85vh] rounded-tr-[250px] rounded-bl-[250px] px-8 py-12'>
            <br />
            <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12'>
                {/* Image Section */}
                <div className='flex justify-center lg:w-1/2'>
                    <img
                        src="/heroSection.png"
                        alt="Hero Section"
                        className='max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] object-contain'
                    />
                </div>

                {/* Text Section */}
                <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center text-center lg:text-left gap-4'>
                    <p className='text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
                        Authentication <span className='text-secondary'> Portal</span>
                    </p>
                    <p className='text-white text-sm sm:text-base lg:text-lg leading-relaxed max-w-[450px]'>
                        Our authentication portal provides a secure and seamless way for users to access their accounts. We provides a user-friendly interface.
                    </p>
                    {
                        !user ?
                            <Link to='/login' className='mt-8 bg-[#5A2A8F] text-white px-8 sm:px-12 py-3 rounded-lg hover:bg-secondary transition-all duration-500 ease-in-out flex items-center gap-2'>
                                Login
                                <i className="fa-solid fa-arrow-right mt-1"></i>
                            </Link>
                            :
                            <Link to='/profile' className='mt-8 bg-[#5A2A8F] text-white px-8 sm:px-12 py-3 rounded-lg hover:bg-secondary transition-all duration-500 ease-in-out flex items-center gap-2'>
                                Profile
                                <i className="fa-solid fa-arrow-right mt-1"></i>
                            </Link>
                    }
                </div>
            </div>
        </div>
    );
}
