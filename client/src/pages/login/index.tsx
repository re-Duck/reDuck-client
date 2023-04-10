import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// packages
import { Icon } from "@iconify/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// assets
import googleLogo from "../../assets/images/google_logo.png";

// service
import { axios_post } from "@/service/api";

const ValidationSchema = Yup.object().shape({
  userId: Yup.string().required("ID를 입력해주세요."),
  password: Yup.string().required("비밀번호를 입력해주세요."),
});

interface LoginType {
  userId: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  // TODO: any타입 정의하기
  const handleSubmit = async (sendData: LoginType, setSubmitting: any) => {
    setSubmitting(true);
    const data = await axios_post("/login", sendData);
    if (data !== undefined) {
      //TODO: data 세팅하기
      console.log(data);
      router.push("/");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Link href="/" className="text-2xl font-bold">
        reDuck🐥
      </Link>
      <Formik
        initialValues={{ userId: "", password: "" }}
        validationSchema={ValidationSchema}
        onSubmit={(data, { setSubmitting }) =>
          handleSubmit(data, setSubmitting)
        }
      >
        {({ errors, isSubmitting }) => (
          <Form className="flex flex-col shadow-lg p-8 m-4 gap-y-3 min-w-[22rem] max-w-xl">
            <label className="flex gap-x-2 items-center">
              <span>ID</span>
              <ErrorMessage
                name="userId"
                component="span"
                className="text-xs text-red-500"
              />
            </label>
            <Field
              type="text"
              name="userId"
              placeholder="Input your ID"
              className={`${
                errors.userId && "ring-red-600"
              } relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
            <label className="flex gap-x-2 items-center">
              <span>PW</span>
              <ErrorMessage
                name="password"
                component="span"
                className="text-xs text-red-500"
              />
            </label>
            <Field
              type="password"
              name="password"
              placeholder="Input your password"
              className={`${
                errors.password && "ring-red-600"
              } relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              Sign in
            </button>
            <hr className="border-0 border-t-2 text-center overflow-visible after:content-['OR'] after:relative after:top-[-17px] p-1 after:text-gray-500 after:bg-white" />
            <button
              type="button"
              className="flex text-center gap-x-2 rounded-md shadow-md bg-white px-3 py-2 text-sm font-semibold text-gray hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <Image
                src={googleLogo}
                alt="googleLogo"
                style={{ width: "20px" }}
              />
              <span className="flex-grow">Sign in with Google</span>
            </button>
            <button
              type="button"
              className="group relative flex gap-x-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
