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

  return (
    <main className="">
      <header className="mt-12 min-h-fit border-b-gray-400 border-b">
        <h1 className="block w-full xl:w-4/6 mx-auto p-5 text-2xl">{markdownPost[0].title}</h1>
        <address className="block w-full xl:w-4/6 mx-auto p-5">
          <p>{markdownPost[0].userName}</p>
          <div className="flex">
            <time>{dateFormatter(markdownPost[0].createdAt)}</time>
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
      <div className="grid lg:grid-cols-3 w-full xl:w-4/6 justify-items-center mx-auto">
        <article className="col-span-2 w-full">
          <MarkdownViewer markdown={markdownPost[0].content} />
        </article>

        <aside className="w-full p-1">
          <div className="bg-gray-200 w-full rounded-lg p-5">
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
