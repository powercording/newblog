import Link from "next/link";
import { Article } from "./articleLayout";
import Author from "./author";
import Content from "./content";

interface ArticleRowProps {
  article: Article;
}

export default function ArticleRow({ article }: ArticleRowProps) {
  const { id, title, createdAt, userName } = article;

  return (
    <Link href={`post/${id}`}>
      <Content />
      <Author userName={userName} createdAt={createdAt} />
    </Link>
  );
}
