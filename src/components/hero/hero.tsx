import React from 'react'
import Image from 'next/image'
import { TiTick } from "react-icons/ti";

export default function

  () {
  return (
    <>
      <section className="flex items-center justify-center gap-5 md:gap-10 flex-col lg:flex-row-reverse py-5 px-3 mt-12 ">
      <Image src="/cloud-hosting.png" alt="  cloud-hosting " width={500} height={500} />

      <div className="px-4">
                <h1 className=" text-3xl  ">Cloud Hosting</h1>
                <p className="text-xl  font-bold text-gray-400">
                    The best web hosting solution for your online success
                </p>
                <div className="py-5 ">
                    <div className="flex gap-3 py-1">
                        <TiTick />  Easy To Use Control Panel
                    </div>
                    <div className="flex gap-3 py-1">
                        <TiTick />  Secure Hosting
                    </div>
                    <div className="flex gap-3 py-1">
                        <TiTick />  Website Maintenance
                    </div>
                </div>
            </div>
           
         
      
      </section>

    </>
  )
}
