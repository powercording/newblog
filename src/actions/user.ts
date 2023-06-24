"use server";

import loginHandler from "@/app/service/LoginHandler";

export const pickUser = async (email: string) => {
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
