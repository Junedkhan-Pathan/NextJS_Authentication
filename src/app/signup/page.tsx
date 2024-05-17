"use client";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface IUser {
  username: string;
  email: string;
  password: string;
}

const SingupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const {setUser} = useUser()
  const router = useRouter();
  const formDataHandler = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signUp = async (e: any) => {
    e.preventDefault();
    setButtonDisabled(true);
    const toastLoading = toast.loading("Please wait...");
    try {
      const response = await axios.post("/api/users/signup", formData);
      console.log("Signup Success", response.data);
      setUser(response.data.user)
      toast.dismiss(toastLoading);
      toast.success("Signup Suceess");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
      setButtonDisabled(false);
    } catch (error: any) {
      console.log("Signup Error", error);
      toast.dismiss(toastLoading);
      toast.error(error.message);
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    const { username, email, password } = formData;
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  return (
    <>
      <section className="bg-gray-700 text-gray-800 body-font">
        <Toaster />
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-1/2 md:w-2/3 mx-auto bg-gray-400 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <form onSubmit={signUp}>
              <h2 className="text-gray-900 text-2xl font-bold  title-font mb-5 text-center">
                Sign Up
              </h2>
              <div className="relative mb-4">
                <label
                  htmlFor="username"
                  className="leading-7 text-sm text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={formDataHandler}
                  name="username"
                  className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={formDataHandler}
                  className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={formDataHandler}
                  className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <button
                  disabled={buttonDisabled}
                  className={`mx-auto text-white  border-0 py-2 px-8 focus:outline-none ${
                    buttonDisabled
                      ? "bg-blue-500/[0.5]"
                      : "bg-blue-500 hover:bg-blue-600"
                  } rounded text-lg`}
                >
                  Button
                </button>
                <p className="text-xs text-gray-600 mt-3">
                  Alredy have an account ?{" "}
                  <Link href={"/login"} className="text-sm text-blue-600">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingupPage;
