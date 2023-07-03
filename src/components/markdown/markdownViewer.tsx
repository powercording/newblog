"use client";

import { post } from "@/lib/PostSchema/schema";
import { InferModel } from "drizzle-orm";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export type MarkdownViewerType = {
  markdown?: string
};

export default function MarkdownViewer({ markdown }: MarkdownViewerType) {
  return (
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
        {markdown ?? ""}
      </ReactMarkdown>
    </section>
  );
}
