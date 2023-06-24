import loginHandler from "@/app/service/LoginHandler";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth/src";
import {
  CredentialsConfig,
  CredentialInput,
} from "next-auth/providers/credentials";

type MyUser = {} & User;

const emailCredential: CredentialInput = {
  label: "Email",
  type: "text",
  placeholder: "email",
};
const passwordCredential: CredentialInput = {
  label: "Password",
  type: "password",
  placeholder: "Password",
};

const authorize: CredentialsConfig["authorize"] = async (credentials) => {
  if (!credentials) return Promise.resolve(null);

  const { email } = credentials;

  const [find] = await loginHandler.findUser(email);
  if (!find) return Promise.resolve(null);

  const user: MyUser = {
    id: `${find.id}`,
    email: find.email,
    name: find.name,
  };
  return user;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: emailCredential,
        password: passwordCredential,
      },
      authorize,
    }),
  ],
};
