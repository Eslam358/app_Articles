"use client";

import { useState } from "react";
import { addComment } from "@/utils/allFunctions/allFunctions";
// import { cookies } from "next/headers";
import cookied from "cookie";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/axiosCreat"
import axios from "axios";
import { toast } from "react-toastify";
export default function AddComment({
  id,

}: {
  id: number;

}) {
  const router = useRouter();
  const [text, setText] = useState("");

  const handAddComment = async () => {
    if (!text) {
      toast.error("Comment text is required");
      return;
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/commants`, {
        text,
        articleId: +id
      });
      if (response.status === 201) {
        toast.success("Comment added successfully");
        router.refresh()

      } else {
        toast.error("Failed to add comment");
        console.error("error1", response);
      }


    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error("error2", error);
    }


  }
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();


      await handAddComment();


      setText("");

    }
  };

  return (
    <div>
      <form action="">
        <input
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          name=""
          id=""
          placeholder="add comment"
          className=" p-2 my-3 bg-gray-500 text-white text-lg w-1/2 rounded-md   focus:w-full outline-none block transition-ease transition-all placeholder:text-gray-300 border-none"
        />
      </form>
    </div>
  );
}
