import React from 'react';
import { Link } from 'react-router-dom';
import techStack from '../lib/techStack'

import TechCard from '../components/TechCard';

export default function TechStack() {

    return (
        <div className='mt-16 text-center'>
            <p className='text-3xl text-tertiary mt-2 font-bold'>Tech Stack</p>
            <p className='text-tertiary mt-2'>
                This project is built using a modern and powerful tech stack that ensures efficiency, scalability, and a seamless user experience.
            </p>

            <div className='flex justify-evenly flex-wrap gap-4 mt-8'>
                {techStack.map((tech, index) => (
                    <TechCard
                        key={index}
                        image={tech.image}
                        title={tech.title}
                        description={tech.description}
                    />
                ))}
            </div>

            <Link to={'/'}>
                <button onClick={() => { scroll(0, 0) }} className='bg-primary px-8 py-3 text-white mt-8 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
                    More <i className="fa-solid fa-angles-right"></i>
                </button>
            </Link>

        </div>
    );
}
