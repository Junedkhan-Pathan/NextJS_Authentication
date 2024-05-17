import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(token,process.env.TOKEN_SECRET!);

    return decodedToken.id;
  } catch (error: any) {
    console.log("Error in getDataFromToken route", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
