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
        return <div key={article.id}>{article.title}</div>;
      })}
    </div>
  );
}
