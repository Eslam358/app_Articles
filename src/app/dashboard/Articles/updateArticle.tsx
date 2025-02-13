"use client"

type update = { title: string, setTitle: (text: string) => void, description: string, setDescription: (text: string) => void, isPending: boolean, id: number, setOpen: (open: boolean) => void,handleUpdate:({ title, description, id }: { title: string, description: string, id: number })=>void, }


import { toast } from 'react-toastify';
import { createArticleValidation } from "@/utils/validated/formvalidate";
import { updateArticle } from '@/utils/allFunctions/funArticles';
import { useRouter } from 'next/navigation';
const UpdateArticle = ({ title, setTitle, description, setDescription, isPending, id, setOpen ,handleUpdate}: update) => {
const router = useRouter()


    async  function handelSend_(e: React.FormEvent) {
        e.preventDefault();
        const validated = createArticleValidation.safeParse({ title, description });
        if (!validated.success) {
            toast.error(validated.error.issues[0].message);
            return;
        }
    handleUpdate({title, description, id})
  

   

    }


    return (
        <>
            <div onClick={()=> setOpen(false)} className="  mt-20 fixed top-0 left-0 w-full   bg-[#5856d669] h-full p-10 ">
                <div onClick={(e)=> e.stopPropagation()} className="relative overflow-x-auto p-10 max-w-xl rounded-lg     bg-violet-900  mx-auto ">
                    <h3 className='text-3xl text-center mb-5'>Add The Article</h3>
                    <form onSubmit={handelSend_} className='max-w-xl m-auto'>

                        <p className='text-lg text-gray-300'>Title</p>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name='title' className='block w-full mb-5 p-3 text-lg bg-slate-600  rounded  ' />

                        <p className='text-lg text-gray-300'>description</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} name='description' className='block w-full p-3 text-lg bg-slate-600 rounded resize-none h-40   ' />

                        <button className='text-lg bg-blue-600 flex items-center justify-center gap-3  py-2 px-6 rounded-md my-5 mx-auto w-4/5  hover:bg-blue-700 ' >
                            update
                            {isPending && <svg className="mr-3 size-5  border-t-teal-400  border-2 rounded-full  animate-spin" viewBox="0 0 24 24">
                            </svg>}
                        </button>

                    </form>
                    <button className=' absolute -top-3 right-0 text-lg text-white bg-red-600 flex items-center justify-center w-6 h-6 p-2   rounded-full my-5 mx-auto   hover:bg-red-700' onClick={() => setOpen(false)}>
                        X
                    </button>
                </div>
            </div>
        </>
    );
}

export default UpdateArticle;
