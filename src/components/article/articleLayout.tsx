import Link from "next/link";
import ArticleRow from "./articleRow";

export type Article = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
};

interface ArticleLayoutProps {
  articleList: Article[];
}

export default function ArticleLayout({ articleList }: ArticleLayoutProps) {
  const reverseArticleList = articleList.reverse();

  return (
    <div className="grid gap-3">
      {reverseArticleList.map((article) => {
        return <ArticleRow article={article} key={article.id}></ArticleRow>;
      })}
    </div>
  );
  // return (
  //   <div className="columns-3 space-y-5">
  //     <div className="bg-white w-64 h-fit text-black">1</div>
  //     <div className="bg-white w-64 h-fit text-black">2</div>
  //     <div className="bg-white w-64 h-fit text-black">3</div>
  //   </div>
  // );
}
