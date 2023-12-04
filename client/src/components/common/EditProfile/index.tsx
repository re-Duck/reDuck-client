// react, next
import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { update } from '@/lib/redux/slices/authSlice';

// thrid-party
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// components
import { Avatar, LoadingIcon, Form as CustomForm } from '@/components';

// hooks
import { useModal } from '@/hooks';
import useEmail from '@/hooks/Form/useEmail';
import useInputImage from '@/hooks/Form/useInputImage';

// service
import { userManager } from '@/service/user';
import { logOut } from '@/lib/redux/slices/authSlice';

// constant
import {
  ModalType,
  developExperience,
  errorCodeToMessage,
  errorMessage,
  warningMessage,
  regex,
  successMessage,
} from '@/constants/constant';

// types
import { IUserInfo, EmailState, UserInputData } from '@/types';

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required(errorMessage.blankName),
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
  const router = useRouter();
  const dispatch = useDispatch();

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

  const { openModal, closeModal } = useModal();

  // 이메일
  const {
    certificateRef: userCertificateNumberRef,
    emailState: userEmailState,
    emailAuthToken,
    handleChangeCertifiactionNumber: handleChangeUserCertificationNumber,
    handleRequestEmail: handleRequestUserEmail,
    handleCheckEmail: handleCheckUserEmail,
  } = useEmail('USER');

  const {
    certificateRef: schoolCertificateNumberRef,
    emailState: schoolEmailState,
    emailAuthToken: schoolEmailAuthToken,
    handleChangeCertifiactionNumber: handleChangeSchoolCertificationNumber,
    handleRequestEmail: handleRequestSchoolEmail,
    handleCheckEmail: handleCheckSchoolEmail,
  } = useEmail('SCHOOL');

  const {
    certificateRef: companyCertificateNumberRef,
    emailState: companyEmailState,
    emailAuthToken: companyEmailAuthToken,
    handleChangeCertifiactionNumber: handleChangeCompanyCertificationNumber,
    handleRequestEmail: handleRequestCompanyEmail,
    handleCheckEmail: handleCheckCompanyEmail,
  } = useEmail('COMPANY');

  const { imgRef, profileImg, imgFile, handleChooseFile, handleImgInput } =
    useInputImage(userProfileImgPath);

  const handleLogout = async () => {
    try {
      await fetch('/api/deleteToken', {
        method: 'DELETE',
      });
      dispatch(logOut());
      router.replace('/');
    } catch {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.tryAgain,
      });
    }
  };

  const handleWithdrawal = () => {
    openModal({
      type: ModalType.WARNING,
      message: warningMessage.confirmWithdrawal,
      callback: async () => {
        closeModal();
        try {
          await userManager.deleteUser();
          await fetch('/api/deleteToken', {
            method: 'DELETE',
          });
          dispatch(logOut());
          openModal({
            type: ModalType.SUCCESS,
            message: successMessage.withdrawalSuccess,
            callback: () => {
              closeModal();
              router.replace('/');
            },
          });
        } catch {
          openModal({
            type: ModalType.ERROR,
            message: errorMessage.error,
          });
        }
      },
    });
  };

  const initialValues = {
    name,
    email,
    school,
    company,
    developAnnual,
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
    schoolEmail: schoolEmail || '',
    companyEmail: companyEmail || '',
  };

  const handleSubmit = async (
    inputData: UserInputData,
    setSubmitting: (value: boolean) => void
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { newPasswordConfirm, ...modifyUserDto } = inputData;

    const data = {
      modifyUserDto: {
        ...modifyUserDto,
        emailAuthToken,
        schoolEmailAuthToken,
        companyEmailAuthToken,
      },
      imgFile,
    };
    setSubmitting(true);
    try {
      const userData = await userManager.updateUser({
        data,
        userId,
      });
      const payload = {
        userName: userData.name as string,
        userProfileImgPath: userData.userProfileImgPath || '',
      };
      dispatch(update(payload));
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.profileUpdateSuccess,
      });
    } catch (error) {
      type Code = 'INVALID_PARAMETER' | 'INVALID_PASSWORD';
      openModal({
        type: ModalType.ERROR,
        message:
          error instanceof Error
            ? errorCodeToMessage[error.message as Code]
            : errorMessage.Unknown,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={(data, { setSubmitting }) => handleSubmit(data, setSubmitting)}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="flex flex-1 flex-col p-4 gap-6 sm:p-8">
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="아이디" />
            <span>{userId}</span>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="이름" />
            <CustomForm.FormBox>
              <CustomForm.FormInput type="text" name="name" />
              <CustomForm.FormError
                isDisplay={errors.name !== undefined && touched.name}
                name={errors.name}
              />
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="현재 비밀번호" isEssential={true} />
            <CustomForm.FormBox>
              <CustomForm.FormInput type="password" name="password" />
              <span className="text-xs text-zinc-500 before:content-['*'] before:text-red-500">
                {` 현재 비밀번호는 필수 입력입니다.`}
              </span>
              <CustomForm.FormError
                isDisplay={errors.password !== undefined && touched.password}
                name={errors.password}
              />
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="새 비밀번호" />
            <CustomForm.FormBox>
              <CustomForm.FormInput type="password" name="newPassword" />
              <CustomForm.FormError
                isDisplay={
                  errors.newPassword !== undefined && touched.newPassword
                }
                name={errors.newPassword}
              />
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="비밀번호 확인" />
            <CustomForm.FormBox>
              <CustomForm.FormInput type="password" name="newPasswordConfirm" />
              <CustomForm.FormError
                isDisplay={
                  errors.newPasswordConfirm !== undefined &&
                  touched.newPasswordConfirm
                }
                name={errors.newPasswordConfirm}
              />
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="프로필 이미지" />
            <CustomForm.FormBox>
              <Avatar src={profileImg} alt="profileImg" size="md" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={imgRef}
                onChange={handleImgInput}
              />
              <CustomForm.FormButton
                type="button"
                name="사진 변경"
                onClick={handleChooseFile}
              />
              <CustomForm.FormDiscription name="이미지 크기의 최대용량은 10MB 입니다." />
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="이메일" />
            <CustomForm.FormBox type="column">
              <CustomForm.FormBox>
                <CustomForm.FormInput type="text" name="email" />
                <CustomForm.FormButton
                  type="button"
                  name={
                    userEmailState === EmailState.Submitting ? (
                      <LoadingIcon size={'25px'} />
                    ) : (
                      '인증번호 전송'
                    )
                  }
                  disabled={
                    errors.email !== undefined ||
                    values.email === '' ||
                    initialValues.email === values.email
                  }
                  onClick={() => handleRequestUserEmail(values.email)}
                />
              </CustomForm.FormBox>
              {userEmailState === EmailState.Submitted ? (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="flex-0 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    ref={userCertificateNumberRef}
                    onChange={handleChangeUserCertificationNumber}
                  />
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-28 sm:text-sm"
                    onClick={() => handleCheckUserEmail(values.email)}
                  >
                    인증번호확인
                  </button>
                </div>
              ) : (
                <span className="text-xs text-zinc-500">
                  * 변경시 재인증이 필요합니다.
                </span>
              )}
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="학교" />
            <CustomForm.FormBox>
              <CustomForm.FormInput type="text" name="school" />
              {!schoolEmailAuthentication && (
                <span className="text-xs text-zinc-500">
                  메일 인증이 필요합니다.
                </span>
              )}
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="학교이메일" />
            <CustomForm.FormBox type="column">
              <CustomForm.FormBox>
                <CustomForm.FormInput type="text" name="schoolEmail" />
                <CustomForm.FormButton
                  type="button"
                  name={
                    schoolEmailState === EmailState.Submitting ? (
                      <LoadingIcon size={'25px'} />
                    ) : (
                      '인증번호 전송'
                    )
                  }
                  disabled={
                    errors.schoolEmail !== undefined ||
                    values.schoolEmail === ''
                  }
                  onClick={() => handleRequestSchoolEmail(values.schoolEmail)}
                />
              </CustomForm.FormBox>
              {schoolEmailState === EmailState.Submitted ? (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="flex-0 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    ref={schoolCertificateNumberRef}
                    onChange={handleChangeSchoolCertificationNumber}
                  />
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                    onClick={() => handleCheckSchoolEmail(values.schoolEmail)}
                  >
                    인증번호확인
                  </button>
                </div>
              ) : (
                <span className="text-xs text-zinc-500">
                  * 변경시 재인증이 필요합니다.
                </span>
              )}
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="회사" />
            <CustomForm.FormBox>
              <CustomForm.FormInput type="text" name="company" />
              {!companyEmailAuthentication && (
                <span className="text-xs text-zinc-500">
                  메일 인증이 필요합니다.
                </span>
              )}
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="회사이메일" />
            <CustomForm.FormBox type="column">
              <CustomForm.FormBox>
                <CustomForm.FormInput type="text" name="companyEmail" />
                <CustomForm.FormButton
                  type="button"
                  name={
                    companyEmailState === EmailState.Submitting ? (
                      <LoadingIcon size={'25px'} />
                    ) : (
                      '인증번호 전송'
                    )
                  }
                  disabled={
                    errors.companyEmail !== undefined ||
                    values.companyEmail === ''
                  }
                  onClick={() => handleRequestCompanyEmail(values.companyEmail)}
                />
              </CustomForm.FormBox>
              {companyEmailState === EmailState.Submitted ? (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="flex-0 p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    ref={companyCertificateNumberRef}
                    onChange={handleChangeCompanyCertificationNumber}
                  />
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-xs sm:w-24 sm:text-sm"
                    onClick={() => handleCheckCompanyEmail(values.companyEmail)}
                  >
                    인증번호확인
                  </button>
                </div>
              ) : (
                <span className="text-xs text-zinc-500">
                  * 변경시 재인증이 필요합니다.
                </span>
              )}
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <CustomForm.FormContainer>
            <CustomForm.FormLabel name="개발 시작연도" />
            <CustomForm.FormBox type="column">
              <CustomForm.FormInput
                as="select"
                name="developYear"
                default={0}
                disabled={values.company === ''}
              >
                {developExperience.map((val) => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </CustomForm.FormInput>
              <CustomForm.FormDiscription name="개발 시작연도는 실제 직장에 입사한 연도입니다." />
            </CustomForm.FormBox>
          </CustomForm.FormContainer>
          <div className="flex justify-evenly">
            <CustomForm.FormButton
              type="submit"
              name="정보수정"
              disabled={isSubmitting}
            />
            <CustomForm.FormButton
              type="button"
              name="로그아웃"
              onClick={handleLogout}
            />
            <CustomForm.FormButton
              type="button"
              name="회원탈퇴"
              onClick={handleWithdrawal}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
