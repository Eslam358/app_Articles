"use client";
import Image from "next/image";
import { toast } from 'react-toastify';
import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/navigation";
import { deleteComment, updateComment } from "@/utils/allFunctions/allFunctions";
let edit = false;
let loading = false;
export default function comments({ data, userinfo }: any) {



  const router = useRouter();
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const closeEdit = () => {
    setText("");
    edit = false;
  };
  const openEdit = () => {
    setText(data.text);
    edit = true;
  };

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLTextAreaElement>, id: any) => {
    if (e.key === "Enter") {

      loading = true;

      const response = await updateComment(text, id);

      router.refresh();
      loading = false;
      edit = false;
    }
  };

  const Delete = async (id: any) => {
    if (confirm(`Are you sure you want to delete?`)) {
      const response = await deleteComment(id)
      if (response.status === 200) {
        router.refresh();

      }

    }

  }

  return (
    <>
      <div className="col-span-1 md:col-span-2 lg:col-span-4 p-3 my-5 shadow-sm shadow-gray-50 ">
        <div className="text-lg text-gray-400 ">
          <div className="flex justify-between items-center">
            <p className="text-sm font-bold text-gray-300 bg-green-700 py-1 px-2 rounded-md w-fit my-3">
              {data.user.username}
            </p>

            {(data.userId === userinfo?.id || userinfo?.
              isAdmin) && <div className="flex gap-3">
                {data.userId === userinfo?.id && <Image
                  onClick={openEdit}
                  alt="edit"
                  src="/icons/edit.svg"
                  height={20}
                  width={20}
                  className=" cursor-pointer opacity-50 hover:opacity-100 "
                />}
                <Image
                  onClick={() => Delete(data.id)}
                  alt="delete"
                  src="/icons/delete.svg"
                  height={20}
                  width={20}
                  className=" cursor-pointer opacity-50 hover:opacity-100 "
                />
              </div>}
          </div>
          {!edit ? (
            <p>{data.text}</p>
          ) : (
            <div className=" relative">
              <button
                onClick={closeEdit}
                style={{ lineHeight: 0 }}
                className="absolute -top-1 -right-1 border border-gray-300 rounded-full  hover:text-red-500 w-6 h-6 overflow-hidden text-center leading "
              >
                X
              </button>
              <textarea
                ref={inputRef}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyUp={(e) => handleKeyUp(e, data.id)}
                onBlur={closeEdit}
                className="bg-transparent w-full shadow-none overflow-hidden resize-none focus:outline-none focus:ring-0 "
                value={text}
                disabled={loading}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
