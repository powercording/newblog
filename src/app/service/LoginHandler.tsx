import { database } from "@/database/databseClient";
import { token } from "@/lib/TokenSchema/schema";
import { user } from "@/lib/UserSchema/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

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
    const existUser = await database
      .select()
      .from(user)
      .where(eq(user.email, email));
    return existUser;
  };

  createToken = async (payLoad: number, userId: number) => {
    const loginToken = await database
      .insert(token)
      .values({ payload: `${payLoad}`, userId: userId });
  };

  login = async (email: string, password: string) => {
    // 올바르지 않은 접근 ("이메일 오류,등 일때 유저에게 피드백 주는 방법 생각하기")
    if (!this.validateLogin(email)) {
      redirect("/");
    }
    const isValid = await this.findUser(email);

    if (Array.isArray(isValid) && isValid.length === 0) {
      redirect("/");
    }

    const loginToken = await database
      .select()
      .from(token)
      .where(eq(token.payload, password));

    // const result = await response.json();

    // if (result.state === "ok") redirect("/");
  };
}

const loginHandler = LoginHandler.getInstance();
export default loginHandler;
