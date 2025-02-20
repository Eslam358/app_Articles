"use client"

import { useOptimistic, useTransition, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { updateArticle, deleteArticle } from "@/utils/allFunctions/funArticles"
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Update_Article from "./updateArticle"
const formatDate = (date: any) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        //   hour: '2-digit',
        //   minute: '2-digit',
        //   second: '2-digit',
        //   hour12: true
    }).format(date);
};


const Articles = ({ articles, getAllArticles, page }: any) => {
    const router = useRouter();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(0)
const hidden = !open ? "hidden":""
    const [isPending, startTransition] = useTransition();
    const [optimisticDelArticle, setOptimisticDelArticle] = useOptimistic(articles, (AllArt, article_: any) => {
        switch (article_.case) {
            case 'delete':
                return [...AllArt.filter((a: any) => a.id !== article_.id)];
                case 'Update':
                    return AllArt.map((a: any) => a.id === article_.id? {...a, title: article_.title, description: article_.description } : a);

            case 'create':
            default:
                return AllArt;
        }

    }

    );
const openUpdate = (title:string, description:string, id:number)=>{

    setTitle(title);
    setDescription(description);
    setId(id);
    setOpen(true)

}


    const handleDelete = async (id: any) => {
        startTransition(async () => {

            setOptimisticDelArticle({ id, case: 'delete' });
            await deleteArticle(id);
            router.refresh()
        }

        )
    }
    const handleUpdate = async ({ title, description, id }: { title: string, description: string, id: number }) => {
        console.log({ title, description, id })
        setOpen(false)
        startTransition(async () => {
            
            setOptimisticDelArticle({ id, case: 'Update', title, description });
            await updateArticle(title, description, id)
            router.refresh()
        })
    }
    
    return (
        <>
  <div className="overflow-x-auto ">
                    <table
                        className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900"
                    >
                        <thead className="text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                    title
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                    Created at
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                    Actions
                                    
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">



                        {
                optimisticDelArticle
                    .map((e: any) => {
                        return (
                            <tr key={e.id}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                 {e.id}   {e.title.length > 10 ? e.title.slice(0, 10) + " ..." : e.title}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{formatDate(new Date(e.createdAt))}</td>
                                <td className=" gap-3    whitespace-nowrap  text-gray-700 dark:text-gray-200">
                                    <MdDelete onClick={() => handleDelete(e.id)} className=' text-xl hover:text-red-700 inline mx-3 cursor-pointer' />

                                    
                                    <RiEdit2Line onClick={()=> openUpdate(e.title,e.description,e.id)} className=' text-xl hover:text-blue-700 inline cursor-pointer' />

                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">

                                    <button onClick={()=> router.push(`/dashboard/Articles/${e.id}`)} className='bg-blue-600 px-3 py-2 rounded hover:bg-blue-900'>RedeMore</button>
                                </td>
                            </tr>

                        )

                    })
            }

                        </tbody>
                    </table>
                                <div className ={hidden} >
                                <Update_Article handleUpdate={handleUpdate} id={id} setOpen={setOpen} title={title} setTitle={setTitle} description={description} setDescription={setDescription} isPending={isPending} />

                                </div>
                </div>


        
           
        </>
    );
}

export default Articles;
