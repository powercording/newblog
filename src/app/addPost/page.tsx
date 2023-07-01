"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AddPost() {
  const [markdown, setMarkdown] = useState("");

  return (
    <main className="grid lg:grid-cols-2 justify-items-stretch max-h-screen">
      <textarea
        onChange={(e) => setMarkdown(e.target.value)}
        className="editor h-screen w-full text-black p-20"
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
    </main>
  );
}
