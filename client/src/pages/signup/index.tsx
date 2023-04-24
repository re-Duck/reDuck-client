import Layout from '@/components/Layout';
import React, { useState, useRef } from 'react';

// packages
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// components
import { Divider, Avatar, Modal } from '@/components';

// service
import {
  IMAGE_FILE_MAX_SIZE,
  developExperience,
  errorMessage,
  initialSignupValue,
  MODAL_TITLE,
} from '@/constant';

enum ModalType {
  SUCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

const ValidationSchema = Yup.object().shape({
  userId: Yup.string()
    .required(errorMessage.blankID)
    .min(6, errorMessage.minIDLength)
    .max(12, errorMessage.maxIDLength),
  password: Yup.string()
    .required(errorMessage.blankPassword)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,15}$/,
      errorMessage.invalidFormatPassword
    ),
  passwordConfirm: Yup.string()
    .required(errorMessage.blankPassword)
    .oneOf([Yup.ref('password')], errorMessage.mismatchPassword),
  name: Yup.string().required(errorMessage.blankName),
  email: Yup.string()
    .required(errorMessage.blankEmail)
    .email(errorMessage.invalidFormatEmail),
});

export default function SignUp() {
  const imgRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [certificationNumber, setCertificationNumber] = useState<number | null>(
    null
  );

  // Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.SUCESS);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleModalButton = () => {
    setModalOpen(false);
  };

  const handleChooseFile = () => {
    imgRef.current!.click();
  };

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      const file = e.target.files[0];
      const fileSize = file.size;
      if (fileSize > IMAGE_FILE_MAX_SIZE) {
        setModalOpen(true);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // null 방지
        if (reader.result) {
          if (typeof reader.result === 'string') {
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

  const handleRequestEmail = (
    errorMessage: string | undefined,
    touched: boolean | undefined
  ) => {
    if (typeof errorMessage === 'undefined' && touched) {
      setModalType(ModalType.SUCESS);
      setModalMessage(
        '이메일이 전송됐습니다. 메일함을 확인하시고 인증번호를 입력해주세요'
      );
      setModalOpen(true);
      // TODO: API 연동
      setCertificationNumber(9999);
    } else {
      setModalType(ModalType.ERROR);
      setModalMessage(
        `이메일이 전송에 실패했습니다. ${
          errorMessage === undefined ? '이메일을 입력해주세요.' : errorMessage
        }`
      );
      setModalOpen(true);

      setCertificationNumber(null);
    }
  };
  return (
    <Layout>
      {modalOpen && (
        <Modal
          type={modalType}
          title={MODAL_TITLE[modalType]}
          content={modalMessage}
          buttonType="check"
          handleModalButton={handleModalButton}
        />
      )}
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
          onSubmit={() => console.log('submit')}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="flex flex-col gap-y-10">
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  아이디 <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="userId"
                  className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  placeholder="아이디를 입력해주세요"
                />
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
                >
                  중복확인
                </button>
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="password"
                  className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  placeholder="비밀번호를 입력해주세요 "
                />
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <Field
                  type="password"
                  name="passwordConfirm"
                  className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  placeholder="비밀번호를 한번 더 입력해주세요 "
                />
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  이름 <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="name"
                  className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  placeholder="이름을 입력해주세요."
                />
              </div>
              <div className="inline-flex w-full items-center">
                <label className="text-xs w-28 sm:text-base sm:w-28">
                  프로필 이미지
                </label>
                <div className="flex gap-x-4 items-baseline flex-wrap">
                  <Avatar src={profileImg} alt="profileImg" hasDot={false} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imgRef}
                    onChange={handleImgInput}
                  />
                  <button
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
                        handleRequestEmail(errors.email, touched.email)
                      }
                    >
                      인증번호발송
                    </button>
                  </div>
                  {certificationNumber && (
                    <div className="flex flex-none">
                      <input
                        type="text"
                        className="flex-0 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                      />
                      <button
                        type="button"
                        className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                      >
                        인증번호확인
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="inline-flex w-full h-[38px] items-center">
                <label className="text-xs w-20 sm:text-base sm:w-28">
                  직장
                </label>
                <Field
                  type="text"
                  name="job"
                  className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  placeholder="직장을 선택해주세요"
                />
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
                  개발시작연도
                </label>
                <div className="flex flex-col grow self-baseline">
                  <select
                    name="startYear"
                    disabled={values.job === ''}
                    className={`${
                      values.job === '' && 'opacity-30'
                    } grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600`}
                  >
                    {developExperience.map((val) => (
                      <option value={val} key={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-500 text-xs">
                    개발 시작연도는 실제 직장에 입사한 연도입니다.
                  </span>
                </div>
              </div>
              <Divider type="horizental" thin={2} margin={1} />
              <div className="text-center">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm"
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
