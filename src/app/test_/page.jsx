"use client";
import { useOptimistic, useTransition, useState } from "react";
import App_test from "./page1";
import { date } from "zod";


export default function Page() {

  
  const [todos, setTodo] = useState(["uuuuuuuuu"]);

  const [isPending, startTransition] = useTransition();

  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, (currentTodos, newMessage) => {
   return [ ...currentTodos,newMessage]
  });

  const handleAddTodo = async () => {
    startTransition(async() => {
      const newTodo =   "New Task " + todos.length + " "+ new Date
      setTodo((text)=> [...text , newTodo]); 
      console.log(todos)
      setOptimisticTodos( newTodo )
      await new Promise((resolve) => setTimeout(resolve, 1000));
     

    });

 
  };

  return (
    <>
      <h2>TODO List</h2>
      {optimisticTodos.map((todo, index) => (
        <h4 className="bg-red-600 p-2" key={index}>
          {todo}
        </h4>
      ))}
      <button onClick={handleAddTodo} className="p-3 bg-blue-500">
       {!isPending? "Add Todo":"loading..."}
      </button>
      <hr />
      {/* <App_test /> */}
    </>
  );
}
