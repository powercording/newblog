import authService from "@/app/service/AuthService";
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
  if (!credentials) {
    return Promise.resolve(null);
  }

  const { email, password } = credentials;
  const user = await authService.login(email, password);

  if (!user) {
    return Promise.resolve(null);
  }

  const loginUser: MyUser = {
    id: `${user.id}`,
    email,
    name: user.name,
  };
  return loginUser;
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
