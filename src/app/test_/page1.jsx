"use client"
import { useOptimistic, useState, useRef } from "react";

export default function Thread() {
  // =============================
  const [messages, setMessages] = useState([
    { text: "Hello there!", sending: false, key: 1 }
  ]);

  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  
  // =============================
  const formRef = useRef();
  
  async function formAction(formData) {
    addOptimisticMessage(formData.get("message"));
    // formRef.current.reset(); 
    await sendMessage(formData);
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    
   [ { text: "Hello there!", sending: false, key: 1 }]
  ,


    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  );

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index} className="p-4">
          {message.text}
          {message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef} className="p-4">
        <input className="text-gray-950" type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

// ------------------------------------------------------------------------------------

async function deliverMessage(message) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}
// ------------------------------------------------------------------------------------

//  function App() {

//   const [messages, setMessages] = useState([
//     { text: "Hello there!", sending: false, key: 1 }
//   ]);

//   async function sendMessage(formData) {
//     const sentMessage = await deliverMessage(formData.get("message"));
    
//     setMessages((messages) => [...messages, { text: sentMessage }]);
//   }

//   return <Thread messages={messages} sendMessage={sendMessage} />;
// }
