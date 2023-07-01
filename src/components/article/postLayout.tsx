import { database } from "@/database/databseClient";
import { post } from "@/lib/PostSchema/schema";
import PostCard from "./PostCard";

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
};

export default async function PostsLayout() {
  const posts: Post[] = await database.select().from(post);
  const reversedPosts = posts.reverse();

  return (
    <div className="grid gap-3">
      {reversedPosts.map((post) => {
        return <PostCard post={post} key={post.id}></PostCard>;
      })}
    </div>
  );
}
