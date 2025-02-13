import React from 'react'
import Article from "@/components/articles/oneArticle"
type Params = Promise<{ id: number }>;
export default async function page(props: { params: Params }) {
  const params_id = (await props.params).id
  return (
    <div>

      <Article params_id={params_id} />
    </div>
  )
}