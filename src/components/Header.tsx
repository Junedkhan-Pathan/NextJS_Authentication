"use client";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { user, setUser } = useUser();
  const logoutHandler = async () => {
    const toastLoading = toast.loading("Please Wait...");
    setButtonDisabled(true);
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout", response.data.success);
      if (response.data.success) {
        setUser(null);
        toast.dismiss(toastLoading);
        toast.success("Logout Successfully!!");
        localStorage.setItem("user", "");
      }
      setButtonDisabled(false);
      setLoggedIn(false);
    } catch (error: any) {
      console.log("Logout Error", error);
      toast.dismiss(toastLoading);
      toast.error(error.message);
      setButtonDisabled(false);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user) setLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <>
      <header className="text-gray-400 bg-gray-900 body-font">
        <Toaster />
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">My Projects</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"#"} className="mr-5 hover:text-white">
              About
            </Link>
            <Link href={"#"} className="mr-5 hover:text-white">
              Contact
            </Link>
          </nav>

          {!loggedIn ? (
            <div>
              <Link
                href={"/login"}
                className="inline-flex mx-4 text-white items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-lg font-medium mt-4 md:mt-0"
              >
                Login
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <Link
                href={"/signup"}
                className="inline-flex mx-4 text-white items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-600 rounded text-lg font-medium mt-4 md:mt-0"
              >
                SignUp
              </Link>
            </div>
          ) : (
            <div>
              <button
                disabled={buttonDisabled}
                onClick={logoutHandler}
                className={`inline-flex mx-4 text-white items-center border-0 py-1 px-3 focus:outline-none ${
                  buttonDisabled
                    ? "bg-blue-500/[0.5]"
                    : "bg-blue-500 hover:bg-blue-600"
                }  rounded text-lg font-medium mt-4 md:mt-0`}
              >
                Logout
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <Link
                href={"/profile"}
                className="ml-4 inline-flex text-blue-500 bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 hover:text-blue-600 rounded text-lg"
              >
                See Profile
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
