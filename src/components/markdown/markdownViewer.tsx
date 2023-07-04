"use client";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export type MarkdownViewerType = {
  markdown?: string;
};

export default function MarkdownViewer({ markdown }: MarkdownViewerType) {
  return (
    <ReactMarkdown
      className="markdown prose px-10 py-20  break-words overflow-y-auto overflow-ellipsis w-screen max-w-full"
      components={{
        code({ inline, className, children, ...props }) {
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
      {markdown ?? ""}
    </ReactMarkdown>
  );
}
