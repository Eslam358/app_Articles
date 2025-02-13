"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logOutUser } from "@/utils/allFunctions/allFunctions";
export default function User({ user_info }: any) {
  const [view_info, set_view_info] = useState(false);
  const router = useRouter();
  const sig_out = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await logOutUser()
    router.refresh()
  }
  const open = (e: React.MouseEvent<HTMLButtonElement>) => {
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


  return (
    <>
      <div className=" relative">

        <button onClick={(e) => open(e)} className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75  dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
          <span className="sr-only">user</span>
          <Image src="/icons/person_.svg" width={25} height={25} alt="logo" />

        </button>
        <section
          style={{
            clipPath: `${view_info
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(41% 0, 41% 0, 46% 100%, 46% 100%)"
              }  `,
            transition: "clip-path 0.3s ease-in-out",
          }}
          className="w-[300] rounded-3xl shadow-2xl absolute  -right-14  top-14    bg-gray-800 z-20"
        >
          <div className="p-8 text-center sm:p-12 ">
            <Image
              src="/icons/logo.svg"
              width={30}
              height={30}
              alt="logo"
              className="mx-auto mb-5"
            />
            <p className="flex text-sm font-semibold uppercase  text-gray-600 justify-center gap-2 ">
              <Image src="/icons/person_.svg" width={25} height={25} alt="logo" />
              {user_info?.username}
            </p>

            <h3 className="mt-2 text-sm text-gray-600 ">{user_info?.email}</h3>

            <button
              className="mt-8 inline-block w-full rounded-full bg-pink-600 py-2 text-sm font-bold text-white shadow-xl"
              onClick={(e) => sig_out(e)}
            >
              log out
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
