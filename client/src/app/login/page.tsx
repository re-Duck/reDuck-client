'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '@/lib/redux/features/auth/authSlice';

// packages
import { Icon } from '@iconify/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// components
import { Divider } from '@/components';

// service
import { userManager } from '@/service/user';

// hooks
import useModal from '@/hooks/modal/useModal';

// constant
import {
  initialLoginValue,
  errorMessage,
  errorCodeToMessage,
  ModalType,
} from '@/constants/constant';
import { IReduxState } from '@/types/redux/IReduxState';

const ValidationSchema = Yup.object().shape({
  userId: Yup.string().required(errorMessage.blankID),
  password: Yup.string().required(errorMessage.blankPassword),
});

interface ILogin {
  userId: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Modal
  const modalState = useSelector((state: IReduxState) => state.modal);
  const { openModal } = useModal();

  const handleSubmit = useCallback(
    async (sendData: ILogin, setSubmitting: (value: boolean) => void) => {
      if (modalState.type === ModalType.CLOSE) {
        setSubmitting(true);
        try {
          const userData = await userManager.loginUser({ data: sendData });
          dispatch(logIn(userData));
          router.push('/');
        } catch (error) {
          if (error instanceof Error) {
            type Code = 'USER_NOT_EXIST' | 'INVALID_PASSWORD';
            openModal({
              type: ModalType.ERROR,
              message:
                errorCodeToMessage[error.message as Code] || errorMessage.error,
            });
          } else {
            openModal({
              type: ModalType.ERROR,
              message: errorMessage.error,
            });
          }
        } finally {
          setSubmitting(false);
        }
      }
    },
    [modalState]
  );
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] justify-center items-center">
      <h1 className="text-2xl font-bold">로그인</h1>
      <Formik
        initialValues={initialLoginValue}
        validationSchema={ValidationSchema}
        onSubmit={(data, { setSubmitting }) =>
          handleSubmit(data, setSubmitting)
        }
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col shadow-lg p-10 m-4 gap-y-3 min-w-[22rem] max-w-xl">
            <label className="flex items-center gap-x-2">
              <span>아이디</span>
              <ErrorMessage
                name="userId"
                component="span"
                className="text-xs text-red-500"
              />
            </label>
            <Field
              type="text"
              name="userId"
              placeholder="아이디를 입력하세요."
              className={`${
                touched.userId && errors.userId && 'ring-red-600'
              } relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
            <label className="flex items-center gap-x-2">
              <span>비밀번호</span>
              <ErrorMessage
                name="password"
                component="span"
                className="text-xs text-red-500"
              />
            </label>
            <Field
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요."
              autoComplete="on"
              className={`${
                touched.password && errors.password && 'ring-red-600'
              } relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            />
            <button
              className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              로그인
            </button>
            <hr className="border-0 border-t-2 text-center overflow-visible after:content-['OR'] after:relative after:top-[-17px] p-1 after:text-gray-500 after:bg-white" />
            <button
              type="button"
              className="flex px-3 py-2 text-sm font-semibold text-center bg-white rounded-md shadow-md gap-x-2 text-gray hover:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() =>
                openModal({
                  type: ModalType.ERROR,
                  message: errorMessage.notComplete,
                })
              }
            >
              <Icon icon="devicon:google" fontSize={20} />
              <span className="flex-grow">구글 계정으로 로그인</span>
            </button>
            <button
              type="button"
              className="relative flex px-3 py-2 text-sm font-semibold text-white bg-black rounded-md group gap-x-2 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() =>
                openModal({
                  type: ModalType.ERROR,
                  message: errorMessage.notComplete,
                })
              }
            >
              <Icon icon="mdi:github" fontSize={20} />
              <span className="flex-grow">깃허브 계정으로 로그인</span>
            </button>
            <div className="flex justify-evenly">
              <Link
                href="/signup"
                className="underline underline-offset-4 before:content-['글'] before:invisible after:content-['자'] after:invisible"
              >
                회원가입
              </Link>
              <Divider type="vertical" thin={1} margin={1} />
              <span
                className="underline cursor-pointer underline-offset-4"
                onClick={() =>
                  openModal({
                    type: ModalType.ERROR,
                    message: errorMessage.notComplete,
                  })
                }
              >
                비밀번호찾기
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
