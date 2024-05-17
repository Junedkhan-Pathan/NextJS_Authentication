import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication app",
  description: "Created by junedkhan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative h-screen w-full bg-gray-900 flex flex-col justify-normal">
          <UserProvider>
            <Header />
            <div className="h-5/6 bg-gray-700">{children}</div>
            <Footer />
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
