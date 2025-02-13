"use client";
import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {getUser} from "@/utils/allFunctions/testUser"


export default function User({  menu }: any) {
  const [view_info, set_view_info] = useState(false);


  
  const open = (e: any) => {
    e.stopPropagation();
    set_view_info(!view_info);
  };
  


  useEffect(() => {
    const handleClick = () => {
      set_view_info(false);
    };
    if (view_info) {
      window.addEventListener("click", handleClick);

    }
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [view_info]);





  const sig_out = () => {
    console.log("go out");
  };
  return (
    <>
      <div className=" relative">
        <button
          onClick={(e) => open(e)}
          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
        >
          <span className="sr-only">user</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>{" "}
        </button>
        <section

          onClick={(e) => e.stopPropagation()}

          style={{
            clipPath: `${view_info
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(41% 0, 41% 0, 46% 100%, 46% 100%)"
              }  `,
            transition: "clip-path 0.3s ease-in-out",
          }}
          className="w-screen z-20 absolute top-14 -right-5 max-w-lg "
        >
          <div className="p-8 text-center sm:p-12  mx-5   rounded-3xl         bg-gray-900  border border-gray-600">
            <Image
              src="/icons/logo.svg"
              width={30}
              height={30}
              alt="logo"
              className="mx-auto mb-5"
            />
            <div>
              <ul className="flex items-center flex-col gap-5 text-sm w-full mt-10">
              {
                  menu.map((menu:any ,ind: number) =>(
                    <li key={ind} className={`${menu.hidden} w-full`}>
                      <Link
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 bg-gray-800 hover:bg-gray-700 w-4/5 mx-auto  block py-2 rounded-full"
                    href={menu.href}
                    onClick={()=> set_view_info(false)}
                      >
                        {menu.label}
                      </Link>
                    </li>
                  ))
                }
               
               
        
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
