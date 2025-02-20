"use client";

import { use, useState } from "react";
import Link from "next/link";
import { registerValidation } from "@/utils/validated/formvalidate";
import { useRouter } from "next/navigation";
import { createUser } from "@/utils/allFunctions/allFunctions";
const register = () => {

  const router = useRouter()
  const [errors, setErrors] = useState({}) as any;


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    setErrors({});
    const validated = registerValidation.safeParse(formJson);
    if (!validated.success) {
      const username = validated.error.issues.filter(
        (issue) => issue.path[0] === "username"
      )[0]?.message;
      const password = validated.error.issues.filter(
        (issue) => issue.path[0] === "password"
      )[0]?.message;
      const email = validated.error.issues.filter(
        (issue) => issue.path[0] === "email"
      )[0]?.message;
      setErrors({ username, password, email });
      return;
    }

    try {
      const response = await createUser(formJson);
      if (response.status === 201) {
        router.replace("/")
        router.refresh();
      }

    } catch (err) {
      console.log(err, "Something went wrong, please try again later");
    }
  };

  return (
    <>
       <section className="w-full flex justify-center items-center h-[80vh]   ">
                <div className="w-full  max-w-md md:max-w-xl p-5 sm:p-10 shadow-sm shadow-slate-400">
                    <h2 className="text-2xl mb-4 text-center">log up</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full"
                    >
                         <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300"                  >
                    username
                  </label>

                  <input

                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 w-full rounded-md border-gray-200 bg-gray-800 text-sm text-gray-100 shadow-sm"
                    />
                  <p className="ml-2  text-xs  text-red-700">
                    {errors.username}
                  </p>
                </div>
                        <div className="w-full">
                            <label
                                htmlFor="Email"
                                className="block text-sm font-medium text-gray-300"
                            >
                                {" "}
                                Email{" "}
                            </label>

                            <input

                                type="email"
                                id="Email"
                                name="email"
                                className="mt-1 w-full rounded-md border-gray-200 bg-gray-800 text-sm text-gray-100 shadow-sm"
                            />
                            <p className="ml-2  text-xs  text-red-700">{errors.email}</p>
                        </div>

                        <div className="w-full ">
                            <label
                                htmlFor="Password"
                                className="block text-sm font-medium text-gray-300"
                            >
                                {" "}
                                Password{" "}
                            </label>

                            <input

                                type="password"
                                id="Password"
                                name="password"
                                className="mt-1 w-full rounded-md border-gray-200 bg-gray-800 text-sm text-gray-100 shadow-sm"
                            />
                            <p className="ml-2  text-xs  text-red-700 ">
                                {errors.password}
                            </p>
                        </div>


                        <div className="">
                            <button className="my-4 block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                                log In
                            </button>

                            <p className="mt-4 text-sm text-gray-200 sm:mt-0">
                                Don&apos;t have an account?

                                <Link href="/register" className="text-gray-400 underline">
                                    Sign up now.
                                </Link>


                            </p>
                        </div>
                    </form>


                </div>
            </section>
    </>
  );
};

export default register;
