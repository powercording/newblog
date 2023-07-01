import Link from "next/link";
import { Post } from "./postLayout";
import Author from "./author";
import Content from "./content";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { id, title, createdAt, userName, content } = post;

  return (
    <Link href={`post/${id}`}>
      <Content title={title} content={content} />
      <Author userName={userName} createdAt={createdAt} />
    </Link>
  );
}
