"use server";

type UserInfo = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  vaild: number | null;
};

type ExistUser = {
  ok: true;
  data: UserInfo;
  status: number;
  message: string;
};

type NoUser = {
  ok: false;
  data: undefined;
  status: number;
  message: string;
};

type User = ExistUser | NoUser;

import loginHandler from "@/app/service/LoginHandler";

export const pickUser = async (email: string): Promise<User> => {
  const [find] = await loginHandler.findUser(email);

  if (find) {
    return { ok: true, data: find, status: 200, message: "success" };
  }

  return {
    ok: false,
    data: undefined,
    status: 404,
    message: "user not found",
  };
};

export const createToken = async (email: string, user: User) => {
  if (user.ok === false) return null;

  const payLoad = Math.floor(100000 + Math.random() * 900000);
  loginHandler.createToken(payLoad, user.data.id);
};
