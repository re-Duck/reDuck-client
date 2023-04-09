import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Login() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Link href="/" className="text-2xl font-bold">
        reDuck🐥
      </Link>
      <form className="flex flex-col shadow-lg p-8 gap-y-3 min-w-[24rem] max-w-xl">
        <label>ID</label>
        <input
          type="text"
          placeholder="Input your ID"
          className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label>PW</label>
        <input
          type="password"
          placeholder="Input your password"
          className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Login
        </button>
        <hr />
        <div className="flex justify-between">
          <button className="flex gap-x-2 rounded-md bg-[#4285F4] px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <Icon icon="ion:logo-google" style={{ fontSize: "20px" }} />
            <span>Google Login</span>
          </button>
          <button className="group relative flex gap-x-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <Icon icon="mdi:github" style={{ fontSize: "20px" }} />
            <span>Github Login</span>
          </button>
        </div>
        <div className="flex justify-evenly">
          <span>Register</span>
          <span>|</span>
          <span>FindPW</span>
        </div>
      </form>
    </div>
  );
}
