import React from 'react';
import Ddd from '@/components/dashboard/ddd';
import { getUser } from "@/utils/allFunctions/testUser"

import { redirect } from 'next/navigation'
const Layout = async ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {

    const user = await getUser()
    if (!user?.isAdmin) {
        redirect("/")
    }


    return (
        <div className='flex container  mx-auto   max-w-screen-xl mt-5   px-4 sm:px-6 lg:px-8  '>
            <div className=' w-40 sm:w-56 md:w-60  '>

                <Ddd />
            </div>
            <div className='flex-auto  '>

                {children}

            </div>
        </div>
    );
}

export default Layout;
