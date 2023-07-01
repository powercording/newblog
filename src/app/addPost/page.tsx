"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AddPost() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");

  const handlePostRegister = () => {
    console.log(markdown);
    console.log(title);
  };

  return (
    <main className="grid lg:grid-cols-2 justify-items-stretch max-h-screen">
      <textarea
        onChange={(e) => setMarkdown(e.target.value)}
        className="editor h-screen w-full text-black p-20 focus:outline-none"
        placeholder="Write your markdown here..."
      ></textarea>
      <section className="p-20 prose max-h-screen">
        <ReactMarkdown
          className="markdown"
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  className="w-full"
                  {...props}
                  style={vscDarkPlus}
                  language={match[1] ?? "jsx"}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props}>{children}</code>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {markdown}
        </ReactMarkdown>
      </section>
      <div className="flex border fixed h-16 bottom-0 inset-x-0 lg:inset-x-[300px] bg-white rounded-t-lg drop-shadow-md shadow-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해 주세요"
          className="w-full h-full px-4 font-bold focus:outline-none bg-gray-50"
        />
        <button
          onClick={handlePostRegister}
          className="w-24 border-r hover:bg-zinc-200"
        >
          글쓰기
        </button>
        <button className="w-24 hover:bg-zinc-200">임시1</button>
      </div>
    </main>
  );
}
