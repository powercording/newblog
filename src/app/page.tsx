import { database } from "@/database/databseClient";
import { post } from "@/lib/PostSchema/schema";
import ArticleLayout from "@/components/article/articleLayout";

export default async function Home() {
  const articleList = await database.select().from(post);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ArticleLayout articleList={articleList}></ArticleLayout>
    </main>
  );
}
