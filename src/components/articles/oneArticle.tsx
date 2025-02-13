
import AddComment from "@/components/articles/comments/addcomment";
import Comments from "@/components/articles/comments/comments";
import { Article } from "@prisma/client";
import {getUser} from "@/utils/allFunctions/testUser"

import { getArticle } from "@/utils/allFunctions/getArticles";
type Params = Promise<{ id: number }>;
type Par = Article;
type Comment = {
  id: number;
  text: string;
  createdAt: string;
  user: { username: string };
};

type data = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  user: { username: string };
  comments: Par[];
};

export default async function page( { params_id }:{params_id:number}) {
  const user = await getUser();


  const article = (await getArticle(params_id))?.data.Article || undefined








  return (
    <>
      <section className="container mx-auto px-5">
        <h2 className="text-2xl text-center my-10 bg-gray-800 py-2 ">
          article
        </h2>
        <div className="text-center  p-5 rounded-sm border border-emerald-700 text-[#13b913]  ">
          <h1 className="text-2xl font-bold">{article?.title}</h1>
          <p className="text-lg text-gray-300 my-3">{article?.description}</p>
        {article ?  <div className="text-lg text-gray-500 flex justify-between items-center border-t border-gray-600 py-3">
            <p>Author: {article?.user?.username}</p>
            <p>
              Created At: {article?.createdAt?.replace("T", " ").slice(0, -13)}
            </p>
          </div> :
          <p className="text-lg text-gray-400">No comments yet...</p> 
          
        }
        </div>
        <AddComment id={params_id} />
        {article?.comments?.map((comment: any) => {
          return (
            <Comments
              key={comment.id}
              data={comment}
              userinfo={user}

            />
          );
        })}
      </section>
    </>
  );
}
