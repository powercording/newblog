"use client";

type MarkdownEditor = {
  setMarkdown: (markdown: string) => void;
  markdown: string;
  // setTitle: (title: string) => void;
};

export default function MarkdownEditor({
  setMarkdown,
  markdown,
}: MarkdownEditor) {
  return (
    <textarea
      className="editor h-screen w-full text-black p-20 focus:outline-none "
      onChange={(e) => setMarkdown(e.target.value)}
      value={markdown ?? null}
      placeholder="Write your markdown here..."
    ></textarea>
  );
}
