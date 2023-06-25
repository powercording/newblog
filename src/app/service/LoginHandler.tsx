import { database } from "@/database/databseClient";
import { token } from "@/lib/TokenSchema/schema";
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
  validateEmail = (email: string) => {
    return /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
  };

  validatePassword = (password: string) => {
    if (Number.isNaN(+password)) return false;
    return Number.isInteger(+password);
  };

  findUser = async (email: string) => {
    if (!this.validateEmail(email)) return Promise.resolve(null);

    const existUser = await database
      .select()
      .from(user)
      .where(eq(user.email, email));
    return existUser[0];
  };

  findToken = async (password: string) => {
    if (!this.validatePassword(password)) return Promise.resolve(null);

    const existToken = await database
      .select()
      .from(token)
      .where(eq(token.payload, password));
    return existToken[0];
  };

  createToken = async (payLoad: number, userId: number) => {
    database.insert(token).values({ payload: `${payLoad}`, userId: userId });
  };

  login = async (email: string, password: string) => {
    const [user, loginToken] = await Promise.all([
      this.findUser(email),
      this.findToken(password),
    ]);

    if (!user || !loginToken) return Promise.resolve(null);
    if (user.id !== loginToken.userId) return Promise.resolve(null);

    await database.delete(token).where(eq(token.userId, user.id));
    return user;
  };
}
const loginHandler = LoginHandler.getInstance();
export default loginHandler;
