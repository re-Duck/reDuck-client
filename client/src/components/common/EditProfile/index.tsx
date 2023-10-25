// react, next
import React, { useState, useRef } from 'react';

// thrid-party
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signOut, useSession } from 'next-auth/react';
import { logOut } from '@/lib/redux/slices/authSlice';

// components
import { Avatar, LoadingIcon } from '@/components';

// hooks
import { useModal } from '@/hooks';

// service
import { BASE_URL } from '@/service/base/api';
import {
  certificationNumberCheck,
  editProfile,
  sendEditEmail,
} from '@/service/edit-profile';

// constant
import {
  IMAGE_FILE_MAX_SIZE,
  ModalType,
  developExperience,
  errorCodeToMessage,
  errorMessage,
  regex,
  successMessage,
} from '@/constants/constant';

// types
import { IUserInfo, EmailState, UserInputData, EmailType } from '@/types';

interface ICheckEmailDto {
  email: string;
  number: string;
  type: EmailType;
}

interface IAuthToken {
  emailAuthToken?: string;
  schoolEmailAuthToken?: string;
  companyEmailAuthToken?: string;
}

const ValidationSchema = Yup.object().shape({
  password: Yup.string().matches(
    regex.password,
    errorMessage.invalidFormatPassword
  ),
  newPassword: Yup.string().matches(
    regex.password,
    errorMessage.invalidFormatPassword
  ),
  newPasswordConfirm: Yup.string().oneOf(
    [Yup.ref('newPassword')],
    errorMessage.mismatchPassword
  ),
  email: Yup.string().email(errorMessage.invalidFormatEmail),
  schoolEmail: Yup.string().email(errorMessage.invalidFormatEmail),
  companyEmail: Yup.string().email(errorMessage.invalidFormatEmail),
});

export default function EditProfile({ userData }: { userData: IUserInfo }) {
  const {
    company,
    companyEmail,
    companyEmailAuthentication,
    developAnnual,
    email,
    name,
    school,
    schoolEmail,
    schoolEmailAuthentication,
    userId,
    userProfileImgPath,
  }: IUserInfo = userData;

  const { data: session, update } = useSession();
  const accessToken = session?.user.token;

  const { openModal } = useModal();

  const handleLogout = () => {
    logOut();
    signOut({ redirect: true, callbackUrl: '/' });
  };

  // profileImg 관련
  const imgRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string>(
    `${BASE_URL}${userProfileImgPath === undefined ? '' : userProfileImgPath}`
  );
  const [imgFile, setImgFile] = useState<Blob | null>(null);

  // TODO 이메일 Custom Hook 만들기
  const [authToken, setAuthToken] = useState<IAuthToken>({});

  // User 이메일 관련
  const userCertificateNumberRef = useRef<HTMLInputElement>(null);
  const [userEmailState, setUserEmailState] = useState<EmailState>(
    EmailState.None
  );
  const [userCertificationNumber, setUserCertificationNumber] =
    useState<string>('');

  // School 이메일 관련
  const schoolCertificateNumberRef = useRef<HTMLInputElement>(null);
  const [schoolEmailState, setSchoolEmailState] = useState<EmailState>(
    EmailState.None
  );
  const [schoolCertificationNumber, setSchoolCertificationNumber] =
    useState<string>('');

  // Comapny 이메일 관련
  const companyCertificateNumberRef = useRef<HTMLInputElement>(null);
  const [companyEmailState, setCompanyEmailState] = useState<EmailState>(
    EmailState.None
  );
  const [companyCertificationNumber, setCompanyCertificationNumber] =
    useState<string>('');

  const handleChooseFile = () => {
    imgRef.current?.click();
  };

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      const file = e.target.files[0];
      const fileSize = file.size;
      if (fileSize > IMAGE_FILE_MAX_SIZE) {
        alert('이미지 파일 용량 초과');
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

  const handleSubmitEmail = async (
    type: EmailType,
    email: string
  ) => {
    switch (type) {
      case 'USER': {
        setUserEmailState(EmailState.Submitting);
        break;
      }
      case 'SCHOOL': {
        setSchoolEmailState(EmailState.Submitting);
        break;
      }
      case 'COMPANY': {
        setCompanyEmailState(EmailState.Submitting);
        break;
      }
    }
    try {
      const flag = await sendEditEmail({
        data: {
          email,
        },
        accessToken,
      });
      switch (type) {
        case 'USER': {
          flag && setUserEmailState(EmailState.Submitted);
          break;
        }
        case 'SCHOOL': {
          flag && setSchoolEmailState(EmailState.Submitted);
          break;
        }
        case 'COMPANY': {
          flag && setCompanyEmailState(EmailState.Submitted);
          break;
        }
      }
    } catch (e) {
      alert(e);
      switch (type) {
        case 'USER': {
          setUserEmailState(EmailState.None);
          break;
        }
        case 'SCHOOL': {
          setSchoolEmailState(EmailState.None);
          break;
        }
        case 'COMPANY': {
          setCompanyEmailState(EmailState.None);
          break;
        }
      }
    }
  };

  const handleCheckEmail = async (
    type: EmailType,
    email: string
  ) => {
    // 인증번호가 일치한다면 토큰 받아옴
    const number = {
      USER: userCertificationNumber,
      SCHOOL: schoolCertificationNumber,
      COMPANY: companyCertificationNumber,
    };
    const dto: ICheckEmailDto = {
      email,
      number: number[type],
      type,
    };
    const result = await certificationNumberCheck({
      data: dto,
      accessToken,
    });
    if (result.isOkay) {
      const addObject = {
        USER: {
          emailAuthToken: result.data?.emailAuthToken,
        },
        SCHOOL: {
          schoolEmailAuthToken: result.data?.emailAuthToken,
        },
        COMPANY: {
          companyEmailAuthToken: result.data?.emailAuthToken,
        },
      };
      setAuthToken({
        ...authToken,
        ...addObject[type],
      });
    }
  };

  const initialValues = {
    name: name,
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
    email: email,
    school: school,
    schoolEmail: schoolEmail || '',
    company: company,
    companyEmail: companyEmail || '',
    developAnnual: developAnnual,
  };

  const handleSubmit = async (
    inputData: UserInputData,
    setSubmitting: (value: boolean) => void
  ) => {
    const { newPasswordConfirm, ...modifyUserDto } = inputData;

    if (inputData.password === '') {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.blankPassword,
      });
      return;
    }

    const data = {
      modifyUserDto: {
        ...modifyUserDto,
        emailAuthToken:
          userEmailState === EmailState.Submitted
            ? authToken.emailAuthToken
            : '',
        schoolEmailAuthToken:
          schoolEmailState === EmailState.Submitted
            ? authToken.schoolEmailAuthToken
            : '',
        companyEmailAuthToken:
          companyEmailState === EmailState.Submitted
            ? authToken.companyEmailAuthToken
            : '',
      },
      file: imgFile,
    };
    setSubmitting(true);
    const result = await editProfile({ data, userId, accessToken });
    if (result.isOkay) {
      await update({
        ...session,
        user: {
          ...session?.user,
          name: result.data?.name,
          email: result.data?.email,
          userProfileImgPath: result.data?.userProfileImgPath,
        },
      });
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.profileUpdateSuccess,
      });
    } else {
      openModal({
        type: ModalType.ERROR,
        message: errorCodeToMessage[result.code],
      });
    }
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={(data, { setSubmitting }) => handleSubmit(data, setSubmitting)}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="flex flex-1 flex-col p-8 gap-4">
          <div className="flex items-center">
            <label className="w-28 min-w-fit">아이디</label>
            <span>{userId}</span>
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">이름</label>
            <Field
              type="text"
              name="name"
              className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
            />
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">현재 비밀번호</label>
            <div className="flex flex-1 gap-x-4 items-baseline flex-wrap">
              <Field
                type="password"
                name="password"
                className="w-full h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              />
              <span className="text-xs text-zinc-500 before:content-['*'] before:text-red-500">
                {` 현재 비밀번호는 필수 입력입니다.`}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">새 비밀번호</label>
            <Field
              type="password"
              name="newPassword"
              className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
            />
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">비밀번호 확인</label>
            <Field
              type="password"
              name="newPasswordConfirm"
              className="grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
            />
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">프로필이미지</label>
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
                사진 변경
              </button>
              <span className="text-xs text-zinc-500">
                이미지 크기의 최대용량은 10MB 입니다.
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">이메일</label>
            <div>
              <div className="flex gap-x-4 items-baseline flex-wrap">
                <Field
                  type="text"
                  name="email"
                  className="w-full h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                />
                {initialValues.email !== values.email && (
                  <button
                    type="button"
                    disabled={!(touched.email && !errors.email)}
                    onClick={() =>
                      handleSubmitEmail('USER', values.email || '')
                    }
                    className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                  >
                    {userEmailState === EmailState.Submitting ? (
                      <LoadingIcon size={'25px'} />
                    ) : (
                      '인증번호 전송'
                    )}
                  </button>
                )}
                <span className="text-xs text-zinc-500">
                  * 변경시 재인증이 필요합니다.
                </span>
              </div>
              {userEmailState === EmailState.Submitted && (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="flex-0 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    ref={userCertificateNumberRef}
                    onChange={(e) => setUserCertificationNumber(e.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                    onClick={() => handleCheckEmail('USER', values.email || '')}
                  >
                    인증번호확인
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">학교</label>
            <div className="flex flex-1 gap-x-4 items-baseline flex-wrap">
              <Field
                type="text"
                name="school"
                className="w-full h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              />
              {!schoolEmailAuthentication && (
                <span className="text-xs text-zinc-500">
                  메일 인증이 필요합니다.
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">학교이메일</label>
            <div>
              <div className="flex gap-x-4 items-baseline flex-wrap">
                <Field
                  type="text"
                  name="schoolEmail"
                  className="w-full h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                />
                <button
                  type="button"
                  disabled={!(touched.schoolEmail && !errors.schoolEmail)}
                  onClick={() =>
                    handleSubmitEmail('SCHOOL', values.schoolEmail)
                  }
                  className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                >
                  {schoolEmailState === EmailState.Submitting ? (
                    <LoadingIcon size={'25px'} />
                  ) : (
                    '인증번호 전송'
                  )}
                </button>
                <span className="text-xs text-zinc-500">
                  * 변경시 재인증이 필요합니다.
                </span>
              </div>
              {schoolEmailState === EmailState.Submitted && (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="flex-0 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    ref={schoolCertificateNumberRef}
                    onChange={(e) =>
                      setSchoolCertificationNumber(e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                    onClick={() =>
                      handleCheckEmail('SCHOOL', values.schoolEmail)
                    }
                  >
                    인증번호확인
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">회사</label>
            <div className="flex flex-1 gap-x-4 items-baseline flex-wrap">
              <Field
                type="text"
                name="company"
                className="w-full h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              />
              {!companyEmailAuthentication && (
                <span className="text-xs text-zinc-500">
                  메일 인증이 필요합니다.
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">회사이메일</label>
            <div>
              <div className="flex gap-x-4 items-baseline flex-wrap">
                <Field
                  type="text"
                  name="companyEmail"
                  className="w-full h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                />
                <button
                  type="button"
                  disabled={!(touched.companyEmail && !errors.companyEmail)}
                  onClick={() =>
                    handleSubmitEmail('COMPANY', values.companyEmail)
                  }
                  className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                >
                  {companyEmailState === EmailState.Submitting ? (
                    <LoadingIcon size={'25px'} />
                  ) : (
                    '인증번호 전송'
                  )}
                </button>
                <span className="text-xs text-zinc-500">
                  * 변경시 재인증이 필요합니다.
                </span>
              </div>
              {companyEmailState === EmailState.Submitted && (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="flex-0 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    ref={companyCertificateNumberRef}
                    onChange={(e) =>
                      setCompanyCertificationNumber(e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                    onClick={() =>
                      handleCheckEmail('COMPANY', values.companyEmail)
                    }
                  >
                    인증번호확인
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-28 min-w-fit">개발연차</label>
            <div className="flex flex-col grow self-baseline">
              <Field
                as="select"
                name="developYear"
                default={developAnnual}
                disabled={values.company === ''}
                className={`${
                  values.company === '' && 'opacity-30'
                } grow h-full p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 max-w-xs focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600`}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-none rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
          >
            정보수정
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </Form>
      )}
    </Formik>
  );
}
