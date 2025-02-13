import React from 'react';
import Link from 'next/link';
import { RiDashboardLine } from "react-icons/ri";
const Ddd = () => {
    return (
        <div className='pl-4 py-5 '>
       <div className='py-5 '>
            <Link href="/dashboard" className='flex items-center text-xl gap-2 hover:text-gray-300'>
            <RiDashboardLine className='text-xl'/>   Dashboard
            </Link>
            </div>
          
           <div className='ml-5 my-4 '>
            <Link href="/dashboard/Articles" >
                <p className=' hover:text-gray-300 ease-in-out duration-300 '>Articles</p>
            </Link>
            <Link href="//dashboard/Comments" >
                <p className='pt-4 hover:text-gray-300 ease-in-out duration-300'>Comments</p>
            </Link>
            </div>
           
            
        </div>
    );
}

export default Ddd;
