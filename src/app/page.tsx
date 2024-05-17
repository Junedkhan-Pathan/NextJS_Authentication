"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  return (
    <section className="text-gray-400 bg-gray-700 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center ">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            NextJS authentication project
          </h1>
          <p className="mb-8 leading-relaxed">
            Learned the NextJS authentication with the nodemailer for verify ,
            mongoose database connections , mailtrap for mails,jsonwebtoken for
            tokenization ,bcryptjs for hashing and for frontend tailwind
            ,tailblock,react-hot-toast more in NextJS with typescript
          </p>
          {!user ? (
            <div className="flex justify-center">
              <Link
                href={"/signup"}
                className="inline-flex mx-4 text-white items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-lg font-medium mt-4 md:mt-0"
              >
                SignUp
              </Link>
              <Link
                href={"/login"}
                className="mx-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
              >
                Login
              </Link>
            </div>
          ) : (
            <Link
              href={"#"}
              className="inline-flex mx-4 text-white items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-lg font-medium mt-4 md:mt-0"
            >
              Expolre
            </Link>
          )}
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4/5 h-full text-white p-16 bg-blue-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
