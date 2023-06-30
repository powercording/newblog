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
    <main className="grid lg:grid-cols-2 max-h-screen">
      <textarea
        onChange={(e) => setMarkdown(e.target.value)}
        className="h-screen w-full text-black p-10 lg:p-20"
      ></textarea>
      <ReactMarkdown
        className="p-10 lg:p-20 w-full prose"
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
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
    </main>
  );
}
