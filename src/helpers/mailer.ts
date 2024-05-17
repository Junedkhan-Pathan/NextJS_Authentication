import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userMode";
export async function sendEmail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transport = await nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b04a78704b4df2",
        pass: "2ebc18d7391325",
      },
    });

    const mailOption = {
      from: "test@test.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify yout email" : "Reset your password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }  or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOption);

    return mailResponse;
  } catch (error: any) {
    console.log("Send mail failed!!", error);
    throw new Error(error.message);
  }
}
