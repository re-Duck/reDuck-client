'use client';

// react, next
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { update } from '@/lib/redux/features/auth/authSlice';
import { useQuery } from '@tanstack/react-query';

// thrid-party
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// components
import { Avatar, LoadingIcon, Form as CustomForm } from '@/components';

// hooks
import useEmail from '@/hooks/form/useEmail';
import useInputImage from '@/hooks/form/useInputImage';
import useModal from '@/hooks/modal/useModal';

// service
import { userManager } from '@/service/user';
import { logOut } from '@/lib/redux/features/auth/authSlice';

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

export default function EditProfile({
  targetUserId,
}: {
  targetUserId: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { openModal, closeModal } = useModal();

  const { data: userData } = useQuery({
    queryKey: ['editProfile', targetUserId],
    queryFn: () => userManager.getUser(targetUserId),
    suspense: true,
  });

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
  } = userData as IUserInfo;

  // 이메일
  const userEmail = useEmail('USER');

  const userSchoolEmail = useEmail('SCHOOL');

  const userCompanyEmail = useEmail('COMPANY');

  const { imgRef, profileImg, imgFile, handleChooseFile, handleImgInput } =
    useInputImage(userProfileImgPath);

  const handleLogout = async () => {
    try {
      await userManager.logoutUser();
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
          await userManager.logoutUser();
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
        emailAuthToken: userEmail.emailAuthToken,
        schoolEmailAuthToken: userSchoolEmail.emailAuthToken,
        companyEmailAuthToken: userCompanyEmail.emailAuthToken,
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
        userName: userData.name,
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
        <Form className="flex flex-col flex-1 gap-6 p-4 bg-white border sm:p-8">
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
              <CustomForm.FormButton type="button" onClick={handleChooseFile}>
                사진 변경
              </CustomForm.FormButton>
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
                  disabled={
                    errors.email !== undefined ||
                    values.email === '' ||
                    initialValues.email === values.email
                  }
                  onClick={() => userEmail.handleRequestEmail(values.email)}
                >
                  {userEmail.emailState === EmailState.Submitting ? (
                    <LoadingIcon size={'25px'} />
                  ) : (
                    '인증번호 전송'
                  )}
                </CustomForm.FormButton>
              </CustomForm.FormBox>
              {userEmail.emailState === EmailState.Submitted ? (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="p-2 rounded-md shadow-sm flex-0 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    ref={userEmail.certificateRef}
                    onChange={userEmail.handleChangeCertifiactionNumber}
                  />
                  <CustomForm.FormButton
                    type="button"
                    onClick={() => userEmail.handleCheckEmail(values.email)}
                  >
                    인증번호확인
                  </CustomForm.FormButton>
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
                  disabled={
                    errors.schoolEmail !== undefined ||
                    values.schoolEmail === ''
                  }
                  onClick={() =>
                    userSchoolEmail.handleRequestEmail(values.schoolEmail)
                  }
                >
                  {userSchoolEmail.emailState === EmailState.Submitting ? (
                    <LoadingIcon size={'25px'} />
                  ) : (
                    '인증번호 전송'
                  )}
                </CustomForm.FormButton>
              </CustomForm.FormBox>
              {userSchoolEmail.emailState === EmailState.Submitted ? (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="p-2 rounded-md shadow-sm flex-0 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    ref={userSchoolEmail.certificateRef}
                    onChange={userSchoolEmail.handleChangeCertifiactionNumber}
                  />
                  <CustomForm.FormButton
                    type="button"
                    onClick={() =>
                      userSchoolEmail.handleCheckEmail(values.schoolEmail)
                    }
                  >
                    인증번호확인
                  </CustomForm.FormButton>
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
                  disabled={
                    errors.companyEmail !== undefined ||
                    values.companyEmail === ''
                  }
                  onClick={() =>
                    userCompanyEmail.handleRequestEmail(values.companyEmail)
                  }
                >
                  {userCompanyEmail.emailState === EmailState.Submitting ? (
                    <LoadingIcon size={'25px'} />
                  ) : (
                    '인증번호 전송'
                  )}
                </CustomForm.FormButton>
              </CustomForm.FormBox>
              {userCompanyEmail.emailState === EmailState.Submitted ? (
                <div className="flex flex-none">
                  <input
                    type="text"
                    className="p-2 rounded-md shadow-sm flex-0 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    ref={userCompanyEmail.certificateRef}
                    onChange={userCompanyEmail.handleChangeCertifiactionNumber}
                  />
                  <CustomForm.FormButton
                    type="button"
                    onClick={() =>
                      userCompanyEmail.handleCheckEmail(values.companyEmail)
                    }
                  >
                    인증번호확인
                  </CustomForm.FormButton>
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
            <CustomForm.FormButton type="submit" disabled={isSubmitting}>
              정보수정
            </CustomForm.FormButton>
            <CustomForm.FormButton type="button" onClick={handleLogout}>
              로그아웃
            </CustomForm.FormButton>
            <CustomForm.FormButton type="button" onClick={handleWithdrawal}>
              회원탈퇴
            </CustomForm.FormButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
