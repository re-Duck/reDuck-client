import Layout from '@/components/Layout';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';

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
import { SignupPost, checkEmail, checkID, sendEmail } from '@/service/signup';

enum ModalType {
  SUCCESS = 'success',
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
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
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
  const router = useRouter();

  const imgRef = useRef<HTMLInputElement>(null);
  const certificateNumberRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<Blob | null>(null);
  const [certificateNumber, setCertificateNumber] = useState<string>('');

  // Modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.SUCCESS);
  const [modalMessage, setModalMessage] = useState<string>('');

  // 아이디 중복 체크 여부
  const [checkedId, setCheckedId] = useState<string>('');

  // 이메일 전송/확인 여부
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [checkedEmail, setCheckedEmail] = useState<string>('');

  const handleModalButton = () => {
    setModalOpen(false);
    if (modalMessage === '회원가입에 성공했습니다. 다시 로그인해주세요.') {
      router.push('/login');
    }
  };

  const checkDuplicateID = async (
    userId: string,
    isTouched: boolean | undefined,
    errorMsg: string | undefined
  ) => {
    if (!isTouched || errorMsg) {
      setModalType(ModalType.ERROR);
      setModalMessage(errorMsg ? errorMsg : errorMessage.blankID);
    } else {
      const response: any = await checkID(userId);
      if (response.state && !response.isDuplicate) {
        setCheckedId(userId);
        setModalType(ModalType.SUCCESS);
        setModalMessage('사용할 수 있는 아이디입니다.');
      } else {
        setCheckedId('');
        setModalType(ModalType.ERROR);
        setModalMessage(
          response.isDuplicate ? errorMessage.duplicateId : errorMessage.network
        );
      }
    }
    setModalOpen(true);
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
      setModalType(ModalType.ERROR);
      setModalMessage(errorMsg ? errorMsg : errorMessage.blankEmail);
    } else {
      // TODO 버튼 스피너 추가 (로딩)
      setSendingEmail(true);
      const status = await sendEmail({ email });
      if (status) {
        setIsSendEmail(true);
        setModalType(ModalType.SUCCESS);
        setModalMessage(
          '이메일이 전송됐습니다. 메일함을 확인하시고 5분 이내로 인증번호를 입력해주세요'
        );
      } else {
        setModalType(ModalType.ERROR);
        setModalMessage('이메일 전송에 실패했습니다. 다시 시도해주세요.');
      }
      setSendingEmail(false);
    }
    setModalOpen(true);
  };

  const handleCertificateNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateNumber(e.target.value);
  };

  const handleCheckEmail = async (email: string) => {
    const data = {
      email,
      number: certificateNumber,
    };
    const status = await checkEmail(data);
    if (status) {
      setCheckedEmail(email);
      setModalType(ModalType.SUCCESS);
      setModalMessage('정상적으로 인증 완료됐습니다.');
    } else {
      setCheckedEmail('');
      setModalType(ModalType.ERROR);
      setModalMessage(
        '메일의 인증번호와 일치하지 않습니다. 인증번호를 확인해주세요'
      );
    }
    setModalOpen(true);
  };

  const handleSubmit = async (sendData: any, setSubmitting: any) => {
    // 아이디 / 이메일 인증확인
    if (checkedId !== sendData.userId || checkedEmail !== sendData.email) {
      setModalType(ModalType.ERROR);
      setModalMessage(
        checkedId !== sendData.userId
          ? errorMessage.checkDuplicateId
          : errorMessage.checkCertificateEmail
      );
      setModalOpen(true);
      return;
    }
    setSubmitting(true);
    const data = {
      signUpDto: sendData,
      file: imgFile,
    };
    const status = await SignupPost(data);
    if (status) {
      setModalType(ModalType.SUCCESS);
      setModalMessage('회원가입에 성공했습니다. 다시 로그인해주세요.');
    } else {
      setModalType(ModalType.ERROR);
      setModalMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
    setModalOpen(true);
    setSubmitting(false);
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
                        handleRequestEmail(
                          values.email,
                          touched.email,
                          errors.email
                        )
                      }
                    >
                      {sendingEmail ? 'Loading..' : '인증번호발송'}
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
