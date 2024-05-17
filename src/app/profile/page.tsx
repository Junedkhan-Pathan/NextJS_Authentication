"use client";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter()

  // if(!user) router.push("/")

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmZlJTIwbWFuJTIwcGhvdG98ZW58MHx8MHx8fDA%3D"
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            {user?.username}
          </h1>

          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            {user?.email}
          </h1>
          <p className="leading-relaxed mb-8">
            Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing
            tousled. Chambray dreamcatcher trust fund, kitsch vice godard
            disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh.
            Pour-over meditation PBR&B pickled ennui celiac mlkshk freegan photo
            booth af fingerstache pitchfork.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
