import Input from '@/components/input/input';
import MarkdownViewer from '@/components/markdown/markdownViewer';
import { database } from '@/database/databseClient';
import { post } from '@/lib/PostSchema/schema';
import { authOptions } from '@/lib/nextAuth/options';
import { dateFormatter } from '@/lib/util/dateTimeFormatter';
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

  //TODO: 댓글 받아오는 api 추가해줭~
  // const commentList = fetch...;

  //TODO: 댓글 작성 api 추가해줭~
  const commentAction = async (comment: FormData) => {
    'use server';
    //todo...
  };
  // throw new Promise(() => {});

  const title = markdownPost[0].title;
  const userName = markdownPost[0].userName;
  const createdAt = markdownPost[0].createdAt;

  return (
    <main className="min-h-screen">
      <header className="mt-12 min-h-fit  bg-slate-800">
        <h1 className="block w-full 2xl:w-3/4 mx-auto p-5 text-2xl font-bold text-blue-600">
          {title}
        </h1>
        <address className="block w-full 2xl:w-3/4 mx-auto p-5 text-gray-400">
          <p>{userName}</p>
          <div className="flex">
            <time>{dateFormatter(createdAt)}</time>
            {isOwner && (
              <Link
                href={`post/edit/${id}`}
                className="ml-auto hover:drop-shadow-md p-1 font-semibold"
              >
                <button>수정하기</button>
              </Link>
            )}
          </div>
        </address>
      </header>
      <div className="grid grid-cols-3 w-full 2xl:w-3/4 justify-items-center mx-auto pt-2 gap-3">
        <article className="col-span-3 lg:col-span-2 w-full">
          <MarkdownViewer markdown={markdownPost[0].content} />
        </article>

        <aside className="w-full col-span-3 lg:col-span-1">
          <div className="bg-gray-200 w-full rounded-lg p-5 sticky top-20">
            <div>댓글1</div>
            <div>댓글2</div>
            <div>댓글3</div>
            <hr className="border-red-500" />
            <form action={commentAction}>
              <Input name="comment" placeholder="코멘트를 입력하세요" />
            </form>
          </div>
        </aside>
      </div>
    </main>
  );
}
