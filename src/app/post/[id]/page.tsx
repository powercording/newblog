import MarkdownViewer from '@/components/markdown/markdownViewer';
import { database } from '@/database/databseClient';
import { post } from '@/lib/PostSchema/schema';
import { authOptions } from '@/lib/nextAuth/options';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export type Params = {
  params: {
    id: string;
  };
};

export default async function Post({ params: { id } }: Params) {
  const session = await getServerSession(authOptions);
  const markdownPost = await database
    .select()
    .from(post)
    .where(eq(post.id, Number(id)));

  const isOwner = session?.user?.name === markdownPost[0].userName;

  return (
    <main className="grid lg:grid-cols-3 w-full xl:w-4/6 justify-items-center mx-auto">
      <article className="col-span-2 py-12">
        <MarkdownViewer markdown={markdownPost[0].content} />
      </article>
      {isOwner && (
        <Link href={`post/edit/${id}`} className="absolute top-20">
          <button>수정</button>
        </Link>
      )}

      <aside className="p-12 w-full">댓글란</aside>
    </main>
  );
}
