import React from 'react'

import HeroSection from './HeroSection'
import About from './About'
import TechStack from './TechStack'
import Testimonials from '../components/Testimonials'

export default function Home() {
    return (
        <div>
            <HeroSection />
            <TechStack />
            <About />
            <Testimonials />
        </div>
    )
}
