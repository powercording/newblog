"use client";

type MarkdownEditor = {
  setMarkdown: (markdown: string) => void;
  markdown: string;
};

export default function MarkdownEditor({
  setMarkdown,
  markdown,
}: MarkdownEditor) {
  return (
    <textarea
      className="editor w-full text-black px-10 py-20 focus:outline-none "
      onChange={(e) => setMarkdown(e.target.value)}
      value={markdown ?? null}
      placeholder="Write your markdown here..."
    ></textarea>
  );
}
