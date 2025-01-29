import React from 'react'

export default function TestimonialCard({ customer }) {
    return (
        <div className='px-2 py-4 bg-white min-w-[220px] max-h-[260px] rounded-xl flex flex-col items-center'>
            {/* image */}
            <img src={customer.image} alt="avatar" className='w-20 h-20 rounded-full mb-4' />

            {/* name */}
            <p className='text-xl font-bold text-center'>{customer.name}</p>

            {/* filled stars */}
            <div className='flex justify-center gap-2 mb-4'>
                {Array.from({ length: customer.rating }).map((_, index) => (
                    <i key={index} className="fa-solid fa-star text-sm text-orange-500"></i>
                ))}
                {/* empty stars */}
                {Array.from({ length: 5 - customer.rating }).map((_, index) => (
                    <i key={index + customer.rating} className="fa-solid fa-star text-sm text-gray-300"></i>
                ))}
            </div>

            {/* customer message */}
            <div className='overflow-y-auto scrollbar-hide'>
                <p className='text-sm overflow-hidden text-ellipsis'>
                    {customer.message}
                </p>
            </div>
        </div>
    )
}
