// "use server";

// type UserInfo = {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string | null;
//   createdAt: string;
//   updatedAt: string;
//   vaild: number | null;
// };

// type ExistUser = {
//   ok: true;
//   data: UserInfo;
//   status: number;
//   message: string;
// };

// export type User = ExistUser | null;

// import loginService from "@/app/service/AuthService";

// export const issueToken = async (email: string, user: User) => {
//   if (!user) return null;

//   const payLoad = Math.floor(100000 + Math.random() * 900000);
//   loginService.createToken(payLoad, user.data.id);
//   loginService.sendEmail(email, payLoad);
// };
