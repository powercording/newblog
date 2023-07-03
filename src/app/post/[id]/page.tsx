import MarkdownViewer from "@/components/markdown/markdownViewer";
import { database } from "@/database/databseClient";
import { post } from "@/lib/PostSchema/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export type Params = {
  params: {
    id: string;
  };
};

export default async function Post({ params: { id } }: Params) {
  const markdownPost = await database
    .select()
    .from(post)
    .where(eq(post.id, Number(id)));

  return (
    <main className="grid lg:grid-cols-2 w-full justify-items-center h-screen">
      <div>
        <MarkdownViewer markdown={markdownPost[0].content} />
        <Link href={`post/edit/${id}`}>
          <button>수정</button>
        </Link>
      </div>
      <aside className="p-20">댓글란</aside>
    </main>
  );
}
