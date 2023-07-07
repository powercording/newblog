import { database } from "@/database/databseClient";
import { token } from "@/lib/TokenSchema/schema";
import { user as User } from "@/lib/UserSchema/schema";
import { InferModel, eq } from "drizzle-orm";

type UserModel = InferModel<typeof User>;
type TokenModel = InferModel<typeof token>;

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

  validateEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
  };

  validatePassword = (password: string): boolean => {
    if (Number.isNaN(+password)) return false;
    return Number.isInteger(+password);
  };

  findUser = async (email: string): Promise<UserModel | null> => {
    if (!this.validateEmail(email)) {
      return null;
    }

    const getUserFromApi = await fetch("api/user", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (getUserFromApi.status !== 200) {
      // throw error??
      return null;
    }

    return await getUserFromApi.json();
  };

  findToken = async (password: string): Promise<TokenModel | null> => {
    if (!this.validatePassword(password)) {
      return Promise.resolve(null);
    }

    const getTokenFromApi = await fetch(`api/token/${password}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (getTokenFromApi.status !== 200) {
      // throw error??
      return null;
    }

    return await getTokenFromApi.json();
  };

  createToken = async (userId: number, payload: number): Promise<void> => {
    await fetch(`api/token`, {
      method: "POST",
      body: JSON.stringify({ payload, userId }),
    });
  };

  sendEmail = async (email: string, payload: number): Promise<void> => {
    await fetch("api/mail", {
      method: "POST",
      body: JSON.stringify({ email, payload }),
    });
  };

  authRequest = async (user: UserModel): Promise<void> => {
    const payload = Math.floor(100000 + Math.random() * 900000);

    await Promise.allSettled([
      this.createToken(user.id, payload),
      this.sendEmail(user.email, payload),
    ]);
  };
}
const authService = AuthService.getInstance();
export default authService;

// login = async (email: string, password: string): Promise<UserModel | null> => {
//   console.log(email, password);

//   const [user, loginToken] = await Promise.all([
//     this.findUser(email),
//     this.findToken(password),
//   ]);

//   if (!user || !loginToken) {
//     return Promise.resolve(null);
//   }
//   if (user.id !== loginToken.userId) {
//     return Promise.resolve(null);
//   }

//   await database.delete(token).where(eq(token.userId, user.id));
//   return user;
// };
