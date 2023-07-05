import smtpTransport from "@/lib/nodemailer/email";
import Mail from "nodemailer/lib/mailer";

export async function POST(req: Request) {
  const { email, payload } = await req.json();
  console.log(email, payload);

  const mailOptions: Mail["options"] = {
    from: process.env.NEXT_PUBLIC_EMAIL_ID,
    to: email,
    subject: "마이블로그 인증번호 입니다.",
    text: `인증번호: ${payload}`,
    html: `<h1>인증번호: ${payload}</h1>`,
  };
  smtpTransport.sendMail(mailOptions);
}
