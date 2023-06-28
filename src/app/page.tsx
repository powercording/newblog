import { database } from "@/database/databseClient";
import { post } from "@/lib/PostSchema/schema";
import ArticleLayout from "@/components/article/articleLayout";

export default async function Home() {
  // try catch and 추상화\
  // 아티클 레이아웃에서 직접 받는것도 고민
  const articleList = await database.select().from(post);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ArticleLayout articleList={articleList}></ArticleLayout>
    </main>
  );
}
