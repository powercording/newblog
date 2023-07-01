import { database } from "@/database/databseClient";
import { Params } from "../../[id]/page";
import { post } from "@/lib/PostSchema/schema";
import { eq } from "drizzle-orm";
import MarkdownSet from "@/components/markdown/markdownSet";

export default async function PostEdit({ params: { id } }: Params) {
  const markdown = await database
    .select()
    .from(post)
    .where(eq(post.id, Number(id)));

  return <MarkdownSet markdown={markdown[0]} renderType="edit" />;
}
