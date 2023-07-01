"use server";

import { InferModel } from "drizzle-orm";
import { post } from "@/lib/PostSchema/schema";
import postService from "@/app/service/PostService";

type Markdown = {
  content: string;
  title: string;
} & Omit<Partial<InferModel<typeof post>>, "content" | "title" | "userName">;

export type MarkdownModel = Markdown & {
  userName: string;
};

function getMarkDownModel(markdown: Markdown): MarkdownModel {
  return {
    ...markdown,
    userName: "adoim@naver.com",
  };
}

export async function insertMarkdown(markdown: Markdown) {
  const markdownModel = getMarkDownModel(markdown);
  console.log(markdownModel);

  if (markdownModel) {
    await postService.registerPost(markdownModel);
  }
}

export async function deleteMarkdown(id: number) {
  await postService.deleteMarkdown(id);
}
