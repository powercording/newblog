import { InferModel, eq } from "drizzle-orm";
import { post } from "@/lib/PostSchema/schema";
import { database } from "@/database/databseClient";

type Markdown = {
  content: string;
  title: string;
} & Omit<Partial<InferModel<typeof post>>, "content" | "title" | "userName">;

export type MarkdownModel = Markdown & {
  userName: string;
};

class PostService {
  private static instance: PostService;

  constructor() {
    if (PostService.instance) {
      throw new Error(
        "Error: Instantiation failed: Use LoginService.getInstance() instead of new."
      );
    }
    PostService.instance = this;
  }

  public static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return this.instance;
  }

  registerPost = async (markdownModel: MarkdownModel) => {
    const result = await database.insert(post).values(markdownModel);
    console.log(result);
  };

  deleteMarkdown = async (id: number) => {
    await database.delete(post).where(eq(post.id, id));
  };
}

const postService = PostService.getInstance();
export default postService;
