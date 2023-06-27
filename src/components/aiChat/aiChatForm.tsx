"use client";

import { useChat, useCompletion } from "ai/react";
import { ChangeEvent } from "react";
import { AiOutlineEnter } from "react-icons/ai";

export default function AiChatForm() {
  // const { completion, input, handleInputChange, handleSubmit } =
  //   useCompletion();
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  console.log();
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);

    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <>
      {/* <div className="self-center w-full lg:w-[600px]">{completion}</div> */}
      {messages.map(({ id, content, role }) => {
        return (
          <div key={id}>
            <p>{role === "user" ? "USER: " : "AI: "}</p>
            <p>{content}</p>
          </div>
        );
      })}
      <form
        className="w-full lg:w-[600px] shadow-lg fixed bottom-0 bg-white border rounded-tr-lg rounded-tl-lg self-center text-center p-2 space-y-2 h-auto"
        onSubmit={handleSubmit}
      >
        <div className="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-background rounded-md border sm:px-12">
          <textarea
            rows={1}
            style={{ height: "62px !important;" }}
            className="w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm h-auto text-black"
            value={input}
            onChange={handleChange}
            onKeyDown={handleEnter}
            placeholder="무엇을 도와드릴까요?"
          />
          <button type="submit" className="absolute p-5 right-2 text-black">
            <AiOutlineEnter />
          </button>
        </div>
        <input
          disabled
          placeholder="powered by powercording"
          className="w-full text-center bg-transparent "
        />
      </form>
    </>
  );
}
