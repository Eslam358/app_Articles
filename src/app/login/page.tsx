import React from 'react';
import Login from "@/components/log/login/login"
import { redirect } from "next/navigation"
import { getUser } from "@/utils/allFunctions/testUser"
const Page = async () => {

    const user = await getUser()
    if (user) {
        redirect('/')
    }
    return (
        <>
            <Login />
        </>
    );
}

export default Page;
