'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export type MarkdownViewerType = {
  markdown?: string;
};

export default function MarkdownViewer({ markdown }: MarkdownViewerType) {
  return (
    <ReactMarkdown
      className="markdown prose prose-pre:p-0 py-6 px-5 break-words overflow-y-auto overflow-ellipsis max-w-full items-center"
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={vscDarkPlus}
              language={match[1] ?? 'jsx'}
              PreTag="div"
              customStyle={{ margin: 0 }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props}>{children}</code>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {markdown ?? ''}
    </ReactMarkdown>
  );
}
