import { database } from "@/database/databseClient";
import { Params } from "../../[id]/page";
import { post } from "@/lib/PostSchema/schema";
import { eq } from "drizzle-orm";
import MarkdownSet from "@/components/markdown/markdownSet";

export default async function PostEdit({ params: { id } }: Params) {
  const markdownPost = await database
    .select()
    .from(post)
    .where(eq(post.id, Number(id)));

  return <MarkdownSet markdown={markdownPost[0].content} renderType="edit" />;
}
