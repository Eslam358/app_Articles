import React from 'react'
import Register from '@/components/log/register/register'
import {getUser} from "@/utils/allFunctions/testUser"
import { redirect  } from 'next/navigation'
export default async function register() {
  const user = await getUser()
  console.log(user)
  if (user) {
   
    
    redirect('/')
  }
  return (
    <div>

      <Register/>

    </div>
  )
}
