import { InferModel, eq } from "drizzle-orm";
import { post } from "@/lib/PostSchema/schema";
import { database } from "@/database/databseClient";

type Markdown = {
  content: string;
  title: string;
} & Omit<Partial<InferModel<typeof post>>, "content" | "title">;

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

  registerPost = async (markdownModel: Markdown) => {
    await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(markdownModel),
    });
  };

  deleteMarkdown = async (id: number) => {
    console.log("d");
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
  };

  updateMarkdown = async (markdownModel: Markdown) => {
    await fetch("/api/post", {
      method: "PATCH",
      body: JSON.stringify(markdownModel),
    });
  };
}

const postService = PostService.getInstance();
export default postService;
