import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userMode";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // we have to perform validation here

    const user = await User.findOne({ email });

    if (user)
      return NextResponse.json(
        { message: "User alredy exist!!" },
        { status: 400 }
      );

    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    //verification email

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully!!",
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    console.log("Error in singup route", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
