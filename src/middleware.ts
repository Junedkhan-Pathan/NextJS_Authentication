import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   const publicPath = ["/", "/login", "/signin", "/about", "/contactus"];
//   const privatePath = ["/verifyemail", "/profile"];

//   const token = request.cookies.get("token")?.value || "";

//   if (privatePath.includes(path) && token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (publicPath.includes(path) && token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signin",
    "/about",
    "/contactus",
    "/verifyemail",
    "/profile",
  ],
};
