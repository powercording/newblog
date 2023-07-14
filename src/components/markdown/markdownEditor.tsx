'use client';

type MarkdownEditor = {
  setMarkdown: (markdown: string) => void;
  markdown: string;
};

export default function MarkdownEditor({ setMarkdown, markdown }: MarkdownEditor) {
  return (
    <textarea
      className="editor w-full text-gray-100 px-5 py-6 focus:outline-none border bg-zinc-600"
      onChange={e => setMarkdown(e.target.value)}
      value={markdown ?? null}
      placeholder="Write your markdown here..."
    ></textarea>
  );
}
