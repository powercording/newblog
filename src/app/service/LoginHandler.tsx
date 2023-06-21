import { database } from "@/database/databseClient";
import { user } from "@/lib/UserSchema/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

class LoginHandler {
  private static instance: LoginHandler;

  constructor() {
    if (LoginHandler.instance) {
      throw new Error(
        "Error: Instantiation failed: Use LoginHandler.getInstance() instead of new."
      );
    }
    LoginHandler.instance = this;
  }

  public static getInstance(): LoginHandler {
    if (!LoginHandler.instance) {
      LoginHandler.instance = new LoginHandler();
    }
    return this.instance;
  }

  getUser = async () => {
    // const result = await fetch("http://localhost:3000/api/user");
    // const response = await result.json();
    // return response;
  };

  // todo: /temp/ 부분 유효한 정규식으로 수정할것.
  validateLogin = (username: string) => {
    const validEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      username
    );
    // const validPassword = /temp/.test(password);
    return validEmail;
  };

  findUser = async (email: string) => {
    console.log(email);
    const user1 = await database
      .select()
      .from(user)
      .where(eq(user.email, email));
    console.log(user1);
    return user1;
  };

  login = async (email: string) => {
    if (!this.validateLogin(email)) {
      // 올바르지 않은 접근 ("이메일 오류,등 일때 유저에게 피드백 주는 방법 생각하기")
      redirect("/join");
    }

    const user = await this.findUser(email);

    if (Array.isArray(user) && user.length === 0) {
      // 올바르지 않은 접근 ("이메일 오류,등 일때 유저에게 피드백 주는 방법 생각하기")
      redirect("/join");
    }

    const response = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      body: JSON.stringify({ user }),
      cache: "no-cache",
    });
    const result = await response.json();

    if (result.state === "ok") redirect("/");
  };
}

const loginHandler = LoginHandler.getInstance();
export default loginHandler;
