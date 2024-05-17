import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userMode";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user)
      NextResponse.json(
        { message: "Given email user not exist!!" },
        { status: 400 }
      );

    const isVerified = await bcryptjs.compare(password, user.password);

    if (!isVerified)
      return NextResponse.json(
        { message: "Password is incorrect!!" },
        { status: 400 }
      );

    // nowerror user credential is correct so we have to make token for them to access the resuource by the token

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in successfully!!",
      success: true,
      user: { username: user.username, email: user.email }, //i shared this for handling the front profile page.
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log("Error in login route", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
