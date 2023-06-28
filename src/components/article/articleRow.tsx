import Link from "next/link";
import { Article } from "./articleLayout";

interface ArticleRowProps {
  article: Article;
}

export default function ArticleRow({ article }: ArticleRowProps) {
  const { id, title, createdAt, userName } = article;

  return (
    <Link href={`post/${id}`}>
      <address className=" flex rounded-2xl overflow-hidden w-full lg:w-80 relative not-italic shadow-md shadow-gray-500/50">
        <div className="bg-gray-300 min-w-[60px] h-20 rounded-r-[50%] absolute self-center"></div>
        <div className="p-2 truncate w-full text-center">
          <h2 className="font-bold ">{userName}</h2>
          <p className="text-xs">{createdAt}</p>
        </div>
      </address>
    </Link>
  );
}
