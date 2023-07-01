import { database } from "@/database/databseClient";
import { token } from "@/lib/TokenSchema/schema";
import { user } from "@/lib/UserSchema/schema";
import smtpTransport from "@/lib/nodemailer/email";
import { eq } from "drizzle-orm";
import Mail from "nodemailer/lib/mailer";

class LoginService {
  private static instance: LoginService;

  constructor() {
    if (LoginService.instance) {
      throw new Error(
        "Error: Instantiation failed: Use LoginService.getInstance() instead of new."
      );
    }
    LoginService.instance = this;
  }

  public static getInstance(): LoginService {
    if (!LoginService.instance) {
      LoginService.instance = new LoginService();
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

    console.log(existToken);
    return existToken[0];
  };

  createToken = async (payLoad: number, userId: number) => {
    await database
      .insert(token)
      .values({ payload: `${payLoad}`, userId: userId });
  };

  sendEmail = async (email: string, payload: number) => {
    const mailOptions: Mail["options"] = {
      from: process.env.NEXT_PUBLIC_EMAIL_ID,
      to: email,
      subject: "마이블로그 인증번호 입니다.",
      text: `인증번호: ${payload}`,
      html: `<h1>인증번호: ${payload}</h1>`,
    };
    smtpTransport.sendMail(mailOptions);
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
const loginService = LoginService.getInstance();
export default loginService;
