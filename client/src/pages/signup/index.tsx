import Layout from '@/components/Layout';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';

// packages
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// components
import { Divider, Avatar, LoadingIcon } from '@/components';

// constant
import {
  IMAGE_FILE_MAX_SIZE,
  developExperience,
  ModalType,
  successMessage,
  errorMessage,
  initialSignupValue,
  regex,
} from '@/constant';

// types
import { ICheckID, ISignupData } from '@/types';

// service
import { SignupPost, checkEmail, checkID, sendEmail } from '@/service/sign-up';

// hooks
import { useModal } from '@/hooks';

const ValidationSchema = Yup.object().shape({
  userId: Yup.string()
    .required(errorMessage.blankID)
    .matches(regex.id, errorMessage.invalidFormatId),
  password: Yup.string()
    .required(errorMessage.blankPassword)
    .matches(regex.password, errorMessage.invalidFormatPassword),
  passwordConfirm: Yup.string()
    .required(errorMessage.blankPassword)
    .oneOf([Yup.ref('password')], errorMessage.mismatchPassword),
  name: Yup.string().required(errorMessage.blankName),
  email: Yup.string()
    .required(errorMessage.blankEmail)
    .email(errorMessage.invalidFormatEmail),
});

export default function SignUp() {
  const router = useRouter();

  const imgRef = useRef<HTMLInputElement>(null);
  const certificateNumberRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string>('');
  const [imgFile, setImgFile] = useState<Blob | null>(null);
  const [certificateNumber, setCertificateNumber] = useState<string>('');

  // Modal
  const { openModal, closeModal } = useModal();

  // 아이디 중복 체크 여부
  const [checkedId, setCheckedId] = useState<string>('');

  // 이메일 전송/확인 여부
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [emailAuthToken, setEmailAuthToken] = useState<string>('');

  const checkDuplicateID = async (
    userId: string,
    isTouched: boolean | undefined,
    errorMsg: string | undefined
  ) => {
    if (!isTouched || errorMsg) {
      openModal({
        type: ModalType.ERROR,
        message: errorMsg ? errorMsg : errorMessage.blankID,
      });
    } else {
      const response: ICheckID = await checkID(userId);
      if (response.state && !response.isDuplicate) {
        setCheckedId(userId);
        openModal({
          type: ModalType.SUCCESS,
          message: successMessage.availableIdSuccess,
        });
      } else {
        setCheckedId('');
        openModal({
          type: ModalType.ERROR,
          message: response.isDuplicate
            ? errorMessage.duplicateId
            : errorMessage.network,
        });
      }
    }
  };

  const handleChooseFile = () => {
    imgRef.current?.click();
  };

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      const file = e.target.files[0];
      const fileSize = file.size;
      if (fileSize > IMAGE_FILE_MAX_SIZE) {
        openModal({
          type: ModalType.ERROR,
          message: errorMessage.imageCapacityExceeded,
        });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // null 방지
        if (reader.result) {
          if (typeof reader.result === 'string') {
            setImgFile(file);
            setProfileImg(reader.result);
          } else {
            // ArrayBuffer인 경우 string으로 변경
            setProfileImg(
              String.fromCharCode.apply(
                null,
                Array.from(new Uint16Array(reader.result))
              )
            );
          }
        }
      };
    }
  };

  const handleRequestEmail = async (
    email: string,
    isTouched: boolean | undefined,
    errorMsg: string | undefined
  ) => {
    if (!isTouched || errorMsg) {
      openModal({
        type: ModalType.ERROR,
        message: errorMsg ? errorMsg : errorMessage.blankEmail,
      });
    } else {
      setSendingEmail(true);
      const status = await sendEmail({ email });
      if (status) {
        setIsSendEmail(true);
        openModal({
          type: ModalType.SUCCESS,
          message: successMessage.sendingEmailSuccess,
        });
      } else {
        openModal({
          type: ModalType.ERROR,
          message: errorMessage.failedSendingEmail,
        });
      }
      setSendingEmail(false);
    }
  };

  const handleCertificateNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateNumber(e.target.value);
  };

  const handleCheckEmail = async (email: string) => {
    const data = {
      email,
      number: certificateNumber,
      type: 'user',
    };
    const result = await checkEmail(data);
    if (result.status) {
      setEmailAuthToken(result.value);
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.confirmNumberSuccess,
      });
    } else {
      setEmailAuthToken('');
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.notmatchConfirmNumber,
      });
    }
  };

  const handleSubmit = async (
    sendData: ISignupData,
    setSubmitting: (value: boolean) => void
  ) => {
    // 아이디 / 이메일 인증확인
    if (checkedId !== sendData.userId || emailAuthToken === '') {
      openModal({
        type: ModalType.ERROR,
        message:
          checkedId !== sendData.userId
            ? errorMessage.checkDuplicateId
            : errorMessage.checkCertificateEmail,
      });
      return;
    }
    setSubmitting(true);
    const data = {
      signUpDto: { ...sendData, emailAuthToken },
      file: imgFile,
    };
    const status = await SignupPost(data);
    if (status) {
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.signUpSuccess,
        callback: () => {
          closeModal();
          router.push('/login');
        },
      });
    } else {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.failedSignUp,
      });
    }
    setSubmitting(false);
  };

  return (
    <Layout viewList={false}>
      <div className="max-w-xl m-auto">
        <div>
          <h2 className="text-2xl font-bold text-center">회원가입</h2>
          <p className="text-xs text-right pt-1">
            <span className="text-red-500">*</span> 필수입력사항
          </p>
        </div>
        <Divider type="horizental" thin={2} margin={4} />
        <Formik
          initialValues={initialSignupValue}
          validationSchema={ValidationSchema}
          onSubmit={(data, { setSubmitting }) =>
            handleSubmit(data, setSubmitting)
          }
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="flex flex-col gap-y-10">
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  아이디 <span className="text-red-500">*</span>
                </label>
                <div className="flex grow flex-col">
                  <Field
                    type="text"
                    name="userId"
                    className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    placeholder="아이디를 입력해주세요"
                  />
                  {errors.userId && touched.userId && (
                    <span className="text-xs text-red-500 translate-y-2 h-0">
                      {errors.userId}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    checkDuplicateID(
                      values.userId,
                      touched.userId,
                      errors.userId
                    )
                  }
                  className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
                >
                  중복확인
                </button>
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col grow">
                  <Field
                    type="password"
                    name="password"
                    className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    placeholder="비밀번호를 입력해주세요 "
                  />
                  {errors.password && touched.password && (
                    <span className="text-xs text-red-500 translate-y-2 h-0">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col grow">
                  <Field
                    type="password"
                    name="passwordConfirm"
                    className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    placeholder="비밀번호를 한번 더 입력해주세요 "
                  />
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <span className="text-xs text-red-500 translate-y-2 h-0">
                      {errors.passwordConfirm}
                    </span>
                  )}
                </div>
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  이름 <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col grow">
                  <Field
                    type="text"
                    name="name"
                    className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    placeholder="이름을 입력해주세요."
                  />
                  {errors.name && touched.name && (
                    <span className="text-xs text-red-500 translate-y-2 h-0">
                      {errors.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="inline-flex w-full items-center">
                <label className="text-xs w-28 sm:text-base sm:w-28">
                  프로필 이미지
                </label>
                <div className="flex gap-x-4 items-baseline flex-wrap">
                  <Avatar src={profileImg} alt="profileImg" size="md" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imgRef}
                    onChange={handleImgInput}
                  />
                  <button
                    type="button"
                    onClick={handleChooseFile}
                    className="rounded-md bg-indigo-600 p-1 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
                  >
                    파일 업로드
                  </button>
                  <span className="text-xs text-zinc-500">
                    이미지 크기의 최대용량은 10MB 입니다.
                  </span>
                </div>
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <div className="flex grow flex-col gap-y-1">
                  <div className="flex grow">
                    <Field
                      type="text"
                      name="email"
                      className="flex-1 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                      placeholder="예 : reduck12@duckoo.com "
                    />
                    <button
                      type="button"
                      className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                      onClick={() =>
                        handleRequestEmail(
                          values.email,
                          touched.email,
                          errors.email
                        )
                      }
                    >
                      {sendingEmail ? (
                        <LoadingIcon size="25px" />
                      ) : (
                        '인증번호발송'
                      )}
                    </button>
                  </div>
                  {isSendEmail && (
                    <div className="flex flex-none">
                      <input
                        type="text"
                        className="flex-0 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                        ref={certificateNumberRef}
                        onChange={handleCertificateNumber}
                      />
                      <button
                        type="button"
                        className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                        onClick={() => handleCheckEmail(values.email)}
                      >
                        인증번호확인
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  학교
                </label>
                <Field
                  type="text"
                  name="school"
                  className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  placeholder="학교를 선택해주세요"
                />
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  직장
                </label>
                <Field
                  type="text"
                  name="company"
                  className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  placeholder="직장을 선택해주세요"
                />
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  개발시작연도
                </label>
                <div className="flex flex-col grow self-baseline">
                  <Field
                    as="select"
                    name="developYear"
                    default={0}
                    disabled={values.company === ''}
                    className={`${
                      values.company === '' && 'opacity-30'
                    } grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600`}
                  >
                    {developExperience.map((val) => (
                      <option value={val} key={val}>
                        {val}
                      </option>
                    ))}
                  </Field>
                  <span className="text-gray-500 text-xs">
                    개발 시작연도는 실제 직장에 입사한 연도입니다.
                  </span>
                </div>
              </div>
              <Divider type="horizental" thin={2} margin={1} />
              <div className="text-center">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20"
                  disabled={isSubmitting}
                >
                  회원가입
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
