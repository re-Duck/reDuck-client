import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import googleLogo from "../../assets/images/google_logo.png";

export default function Login() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Link href="/" className="text-2xl font-bold">
        reDuck🐥
      </Link>
      <form className="flex flex-col shadow-lg p-8 m-4 gap-y-3 min-w-[22rem] max-w-xl">
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
          Sign in
        </button>
        <hr className="border-0 border-t-2 text-center overflow-visible after:content-['OR'] after:relative after:top-[-17px] p-1 after:text-gray-500 after:bg-white" />
        <button className="flex text-center gap-x-2 rounded-md shadow-md bg-white px-3 py-2 text-sm font-semibold text-gray hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <Image src={googleLogo} alt="googleLogo" style={{ width: "20px" }} />
          <span className="flex-grow">Sign in with Google</span>
        </button>
        <button className="group relative flex gap-x-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <Icon icon="mdi:github" style={{ fontSize: "20px" }} />
          <span className="flex-grow">Sign in with Github</span>
        </button>
        <div className="flex justify-evenly">
          <Link href="/signup" className="underline">
            Register
          </Link>
          <span>|</span>
          <span className="underline">FindPW</span>
        </div>
      </form>
    </div>
  );
}
