import React from 'react';
import Link from 'next/link';
import { RiDashboardLine } from "react-icons/ri";
const Ddd = () => {
    return (
        <div className='pl-0 pt-5 '>
            <div className=' '>
                <Link href="/dashboard" className='flex items-center text-xl gap-2 hover:text-gray-300'>
                    <RiDashboardLine className='text-xl' />   Dashboard
                </Link>
            </div>

            <div className='ml-7 mt-4 flex gap-5 flex-row sm:flex-col'>
                <Link href="/dashboard/Articles" >
                    <p className=' hover:text-gray-300 ease-in-out duration-300 '>Articles</p>
                </Link>
                <Link href="//dashboard/Comments" >
                    <p className=' hover:text-gray-300 ease-in-out duration-300'>Comments</p>
                </Link>
            </div>


        </div>
    );
}

export default Ddd;
