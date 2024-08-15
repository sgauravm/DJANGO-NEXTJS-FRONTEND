"use client";

import { useAuth } from "@/components/authProvider";
import { useRouter } from "next/navigation";

const LOGOUT_URL = "/api/logout";

export default function Page() {
  const auth = useAuth();
  async function handleClick(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };

    const response = await fetch(LOGOUT_URL, requestOptions);
    const data = await response.json();

    if (response.ok) {
      console.log("Logged out!");
      auth.logout();
    }
  }
  return (
    <div className="h-[95vh]">
      <div className="max-w-md mx-auto py-5">
        <h1>Are you sure you want to log out? </h1>
        <button
          className="bg-red-500 px-3 py-2 text-white hover:bg-red-400 rounded-md"
          onClick={handleClick}
        >
          Yes, Logout
        </button>
      </div>
    </div>
  );
}
