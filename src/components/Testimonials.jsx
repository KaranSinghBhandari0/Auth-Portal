import React, { useEffect, useRef } from 'react';

import TestimonialCard from './TestimonialCard';
import customers from '../lib/customers'

const Testimonials = () => {
    const scrollContainer = useRef(null);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (scrollContainer.current) {
                const container = scrollContainer.current;
                const maxScroll = container.scrollWidth - container.clientWidth;
                container.scrollLeft = (container.scrollLeft + 1) % (maxScroll + 1);
            }
        }, 15); // Adjust the timing for smooth sliding (in ms)

        return () => clearInterval(scrollInterval); // Clean up interval on unmount
    }, []);

    return (
        <div className="mt-16">
            <p className="text-tertiary font-bold text-3xl text-center">Customer Reviews</p>
            <p className="text-tertiary text-center mb-4 mt-2">Discover how our products have made a difference to those who matter most – our customers!</p>
            <div
                ref={scrollContainer}
                className="w-full overflow-x-scroll scrollbar-hide bg-primary px-4 py-6 flex items-center justify-evenly gap-5 flex-1" >
                {customers.map((customer, index) => (
                    <TestimonialCard key={index} customer={customer} />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
