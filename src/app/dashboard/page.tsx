"use client"
import { useState, useTransition } from 'react';
import axios from 'axios';
import { BASE_URL } from "@/utils/axiosCreat"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { createArticleValidation } from "@/utils/validated/formvalidate";
const Page = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const addArticle = async (
        title: string,
        description: string,

    ): Promise<any> => {
        try {
            const response = await axios.post(`${BASE_URL}/api/articles`, {
                title,
                description
            });


            if (response.status === 201) {
                toast.success(" successfully");
                router.refresh();
                router.push(`/dashboard/Articles`)

            }
            return response.data;

        } catch (error: any) {

            console.error(
                "Error adding comment:",
                error.response?.data
            );
            toast.error(error.response?.data.error);

        }
    };

    async function handelSend_(e: React.FormEvent) {
        e.preventDefault();
        const validated = createArticleValidation.safeParse({ title, description });
        if (!validated.success) {
            toast.error(validated.error.issues[0].message);
            return;
        }
        startTransition(
            async () => {
                await addArticle(title as string, description as string);

            }
        )

    }


    return (
        <>
            <div className=" ">
                <div className="overflow-x-auto p-10 max-w-2xl rounded-lg  bg-violet-900  mx-auto ">
                    <h3 className='text-3xl text-center mb-5'>Add The Article</h3>
                    <form onSubmit={handelSend_} className='max-w-xl m-auto'>

                        <p className='text-lg text-gray-300'>Title</p>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name='title' className='block w-full mb-5 p-3 text-lg bg-slate-600  rounded  ' />

                        <p className='text-lg text-gray-300'>description</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} name='description' className='block w-full p-3 text-lg bg-slate-600 rounded resize-none h-40   ' />

                        <button className='text-lg bg-blue-600 flex items-center justify-center gap-3  py-2 px-6 rounded-md my-5 mx-auto w-4/5  hover:bg-blue-700 ' >
                            Send
                            {isPending && <svg className="mr-3 size-5  border-t-teal-400  border-2 rounded-full  animate-spin" viewBox="0 0 24 24">
                            </svg>}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default Page;
