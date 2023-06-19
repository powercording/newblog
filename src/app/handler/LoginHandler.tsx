import { database } from "@/database/databseClient";
import { user } from "@/lib/UserSchema/schema";
import { eq } from "drizzle-orm";

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

  // todo: /temp/ 부분 유효한 정규식으로 수정할것.
  validateLogin = (username: string) => {
    const validEmail = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      username
    );
    // const validPassword = /temp/.test(password);

    return validEmail;
  };

  findUser = (email: string) => {
    if (!this.validateLogin(email)) {
      return null;
    }

    return database.select().from(user).where(eq(user.email, email));
  };

  login = async (email: string) => {
    const user = await this.findUser(email);
    if (!user?.length) {
      return "유저 없음";
    }
    return user;
  };
}

const loginHandler = LoginHandler.getInstance();
export default loginHandler;
