import { database } from "@/database/databseClient";
import { token } from "@/lib/TokenSchema/schema";
import { user as User } from "@/lib/UserSchema/schema";
import { InferModel, eq } from "drizzle-orm";

type UserModel = InferModel<typeof User>;

class AuthService {
  private static instance: AuthService;

  constructor() {
    if (AuthService.instance) {
      throw new Error(
        "Error: Instantiation failed: Use Authservice.getInstance() instead of new."
      );
    }
    AuthService.instance = this;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
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

  findUser = async (email: string): Promise<UserModel | null> => {
    if (!this.validateEmail(email)) return null;

    const user = await fetch("api/auth", {
      method: "POST",
      body: JSON.stringify({ email }),
      cache: "no-cache",
    });

    if (user) {
      return await user.json();
    }
    return null;
  };

  findToken = async (password: string) => {
    if (!this.validatePassword(password)) return Promise.resolve(null);

    const token = await fetch(`api/auth/token/${password}`, {
      method: "GET",
    });
    console.log(token);
    return await token.json();
  };

  createToken = async (userId: number, payload: number) => {
    await fetch("api/auth/token", {
      method: "POST",
      body: JSON.stringify({ payload, userId }),
    });
  };

  sendEmail = async (email: string, payload: number) => {
    await fetch("api/auth/mail", {
      method: "POST",
      body: JSON.stringify({ email, payload }),
    });
  };

  authRequest = async (user: UserModel) => {
    const payload = Math.floor(100000 + Math.random() * 900000);

    await Promise.allSettled([
      this.createToken(user.id, payload),
      this.sendEmail(user.email, payload),
    ]);
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
const authService = AuthService.getInstance();
export default authService;
