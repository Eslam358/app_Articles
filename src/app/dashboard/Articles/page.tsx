import { Pagination } from "@/components/global/pagination"
import axios from 'axios';
import { BASE_URL } from "@/utils/axiosCreat"
import ArticlesPage from "./articles"
import { getAllArticles } from "@/utils/allFunctions/getArticles"
const Page = async ({ searchParams }: any) => {
    const page = (await searchParams).page || 1;
    const response = await getAllArticles(+page)


    if (response?.status !== 200) {
        return (
            <h2>something  is Error</h2>
        )

    }
    const totalPages = response?.data.totalPages | 0

    const All_Articles = response?.data.All_Articles
 
    if (All_Articles.length === 0) {
        return (
            <h2>No Articles</h2>
        )

    }


    return (
        <>


            <div className=" border border-gray-200 dark:border-gray-700">
                <ArticlesPage articles={All_Articles} getAllArticles={getAllArticles} page={page} />

                <div className="rounded-b-lg border-t border-gray-200 px-4  dark:border-gray-700">
                    <Pagination URL="dashboard/Articles" totalPages={totalPages} page={page} />
                </div>
            </div>
        </>
    );
}

export default Page;
