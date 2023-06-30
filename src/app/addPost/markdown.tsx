"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus/.";

export default function AddPost() {
  const [markdown, setMarkdown] = useState("");
  return (
    <main className="grid lg:grid-cols-2 max-h-screen">
      <textarea
        onChange={(e) => setMarkdown(e.target.value)}
        className="h-screen w-full"
      ></textarea>
      <ReactMarkdown
        className="p-10 w-full prose"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypePrism, rehypeSanitize, rehypeRaw]}
        skipHtml={false}
      >
        {markdown}
      </ReactMarkdown>
    </main>
  );
}
