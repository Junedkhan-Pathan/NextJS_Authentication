"use client";

import { useUser } from "@/context/UserContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verifyHandler = async () => {
    setButtonDisabled(true);
    const toastLoading = toast.loading("Please wait...");
    try {
      await axios.post("/api/users/verifyemail", { token });

      toast.dismiss(toastLoading);
      toast.success("Verify Success!!");
      setVerified(true);
      setButtonDisabled(false);
      setError(false);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      setError(true);
      toast.dismiss(toastLoading);
      toast.error("Verify Failed!!");
      console.log("Error while verify!!", error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]; //for getting token from url in react
    setToken(urlToken || "");
  }, []);

  return (
    <section className="text-gray-400 bg-gray-700 body-font">
      <Toaster />
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-2xl text-1xl mb-4 font-medium text-gray-500">
            Thank you for trust on us!!
          </h1>

          {error && (
            <>
              <h1 className="title-font sm:text-6xl text-3xl mb-4 font-medium text-red-500">
                Oops!! Something went wrong!!
              </h1>
              <p className="leading-relaxed mb-8 text-white">
                Try agin sometime!!
              </p>
            </>
          )}

          {!error &&
            (!verified ? (
              <>
                <h1 className="title-font sm:text-6xl text-3xl mb-4 font-medium text-white">
                  Verify Your Email!!
                </h1>
                <p className="leading-relaxed mb-8">
                  Meggings kinfolk echo park stumptown DIY, kale chips beard
                  jianbing tousled. Chambray dreamcatcher trust fund, kitsch
                  vice godard disrupt ramps hexagon mustache umami snackwave
                  tilde chillwave ugh. Pour-over meditation PBR&B pickled ennui
                  celiac mlkshk freegan photo booth af fingerstache pitchfork.
                </p>
                <div className="flex justify-center">
                  <button
                    disabled={buttonDisabled}
                    onClick={verifyHandler}
                    className={`inline-flex text-white ${
                      buttonDisabled
                        ? "bg-blue-500/[0.5]"
                        : "bg-blue-500 hover:bg-blue-600"
                    } border-0 py-2 px-6 focus:outline-none rounded text-lg`}
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => window.alert("Please verify!!")}
                    className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-900 hover:text-white rounded text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  Verified Successfully!!
                </h1>
                <p className="leading-relaxed mb-8">
                  Meggings kinfolk echo park stumptown DIY, kale chips beard
                  jianbing tousled. Chambray dreamcatcher trust fund, kitsch
                  vice godard disrupt ramps hexagon mustache umami snackwave
                  tilde chillwave ugh. Pour-over meditation PBR&B pickled ennui
                  celiac mlkshk freegan photo booth af fingerstache pitchfork.
                </p>
                <Link
                  href={"/"}
                  className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  Goto Home
                </Link>
              </>
            ))}
        </div>
      </div>
    </section>
  );
};

export default page;
