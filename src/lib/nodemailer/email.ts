import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const senderOptions: SMTPTransport.Options = {
  service: "naver",
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: `${process.env.NEXT_PUBLIC_EMAIL_ID}`,
    pass: `${process.env.NEXT_PUBLIC_EMAIL_PASS}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const smtpTransport = nodemailer.createTransport(senderOptions);
export default smtpTransport;
