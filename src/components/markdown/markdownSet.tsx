"use client";

import { useState } from "react";
import MarkdownViewer from "./markdownViewer";
import MarkdownEditor from "./markdownEditor";
import {
  deleteMarkdown,
  insertMarkdown,
  // updateMarkdown,
} from "@/actions/post";
import { revalidatePath } from "next/cache";
import { InferModel } from "drizzle-orm";
import { post } from "@/lib/PostSchema/schema";

type MarkdownSet = {
  renderType: "edit" | "create";
  markdown?: InferModel<typeof post>;
};

export default function MarkdownSet({ markdown, renderType }: MarkdownSet) {
  const [markdownContent, setMarkdownContent] = useState(
    markdown?.content ?? ""
  );
  const [markdonwTitle, setMarkdownTitle] = useState(markdown?.title ?? "");

  const handleMarkdownRegister = async () => {
    insertMarkdown({ content: markdownContent, title: markdonwTitle });
  };

  const handleMarkdownUpdate = async () => {
    const result = await fetch("/api/post", {
      method: "PATCH",
      body: JSON.stringify({
        markdown: markdownContent,
        title: markdonwTitle,
        id: markdown?.id ?? null,
      }),
    });
  };

  const hnadleMarkdownDelete = async () => {
    await deleteMarkdown(markdown?.id ?? 0);
  };

  const handleMarkdownAutosave = () => {};

  return (
    <main className="grid lg:grid-cols-2 justify-items-stretch max-h-screen">
      <MarkdownEditor
        markdown={markdownContent}
        setMarkdown={setMarkdownContent}
      />
      <MarkdownViewer markdown={markdownContent} />
      <div className="flex border fixed h-16 bottom-0 inset-x-0 lg:inset-x-[300px] bg-white rounded-t-lg drop-shadow-md shadow-md">
        <input
          className="w-full h-full px-6 font-bold focus:outline-none bg-gray-50 text-black"
          type="text"
          value={markdonwTitle ?? ""}
          onChange={(e) => setMarkdownTitle(e.target.value)}
          placeholder="제목을 입력해 주세요"
        />
        <button
          className="w-24 border-x hover:bg-zinc-200 text-black"
          onClick={
            renderType === "create"
              ? handleMarkdownRegister
              : handleMarkdownUpdate
          }
        >
          {renderType === "create" ? "글쓰기" : "수정"}
        </button>
        <button
          className="w-24 hover:bg-zinc-200 text-black"
          onClick={
            renderType === "create"
              ? handleMarkdownAutosave
              : hnadleMarkdownDelete
          }
        >
          {renderType === "create" ? "임시1" : "삭제"}
        </button>
      </div>
    </main>
  );
}
