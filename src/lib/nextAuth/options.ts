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
  placeholder: "jsmith",
};

const authorize: CredentialsConfig["authorize"] = async (credentials) => {
  if (credentials) {
    const { email } = credentials;
    const [find] = await loginHandler.findUser(email);

    const user: MyUser = {
      id: `${find.id}`,
      email: find.email,
      name: find.name,
    };
    return user;
  }
  return Promise.resolve(null);
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
      },
      authorize,
    }),
  ],
};
