import Card from "@/components/articles/card";
import React from "react";
import {getAllArticles} from "@/utils/allFunctions/getArticles"

import axiosCreate from "@/utils/axiosCreat";
import { Pagination } from "@/components/global/pagination";

export default async function ({ searchParams }: any) {
  const page = (await searchParams).page || 1;


  
  const articleData =   await getAllArticles(page);


  const articles = articleData.data.All_Articles || [];

  const totalPages = articleData.data.totalPages;

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-2xl text-center my-10 bg-gray-800 py-5">articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article: any) => {
          return <Card key={article.id} article={article} />;
        })}
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 py-6 my-5">
        <Pagination totalPages={totalPages} page={page} URL="articles"/>
      </div>
    </div>
  );
}
