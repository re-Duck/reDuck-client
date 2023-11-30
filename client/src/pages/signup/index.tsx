import { Layout } from '@/components';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';

// packages
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// components
import { Divider, Avatar, LoadingIcon, Form as CustomForm } from '@/components';

// constant
import {
  IMAGE_FILE_MAX_SIZE,
  developExperience,
  ModalType,
  successMessage,
  errorMessage,
  initialSignupValue,
  regex,
} from '@/constants/constant';

// types
import { ISignupData } from '@/types';

// service
import { userManager } from '@/service/user';
import { emailManager } from '@/service/email';

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
        message: errorMsg || errorMessage.blankID,
      });
    } else {
      try {
        await userManager.checkDuplicateUser(userId);
        setCheckedId(userId);
        openModal({
          type: ModalType.SUCCESS,
          message: successMessage.availableIdSuccess,
        });
      } catch (error) {
        setCheckedId('');
        openModal({
          type: ModalType.ERROR,
          message:
            error === 'duplicate'
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
      try {
        await emailManager.sendSignUpEmail({ email });
        setIsSendEmail(true);
        openModal({
          type: ModalType.SUCCESS,
          message: successMessage.sendingEmailSuccess,
        });
      } catch {
        openModal({
          type: ModalType.ERROR,
          message: errorMessage.failedSendingEmail,
        });
      } finally {
        setSendingEmail(false);
      }
    }
  };

  const handleCertificateNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificateNumber(e.target.value);
  };

  const handleCheckEmail = async (email: string) => {
    try {
      const emailAuthToken = await emailManager.checkSignUpNumber({
        email,
        number: parseInt(certificateNumber),
      });
      setEmailAuthToken(emailAuthToken);
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.confirmNumberSuccess,
      });
    } catch {
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
      imgFile,
    };
    try {
      await userManager.createUser(data);
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.signUpSuccess,
        callback: () => {
          closeModal();
          router.push('/login');
        },
      });
    } catch {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.failedSignUp,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout hasLoginButton={false}>
      <div className="max-w-xl m-auto">
        <div>
          <h2 className="text-2xl font-bold text-center">회원가입</h2>
          <p className="pt-1 text-xs text-right">
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
              <CustomForm.FormContainer>
                <CustomForm.FormLabel name="아이디" isEssential={true} />
                <CustomForm.FormBox>
                  <CustomForm.FormInput
                    type="text"
                    name="userId"
                    placeholder="아이디를 입력해주세요"
                  />
                  <CustomForm.FormButton
                    type="button"
                    name="중복확인"
                    onClick={() =>
                      checkDuplicateID(
                        values.userId,
                        touched.userId,
                        errors.userId
                      )
                    }
                  />
                  <CustomForm.FormError
                    isDisplay={errors.userId !== undefined && touched.userId}
                    name={errors.userId}
                  />
                </CustomForm.FormBox>
              </CustomForm.FormContainer>
              <CustomForm.FormContainer>
                <CustomForm.FormLabel name="비밀번호" isEssential={true} />
                <CustomForm.FormBox>
                  <CustomForm.FormInput
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                  />
                  <CustomForm.FormError
                    isDisplay={
                      errors.password !== undefined && touched.password
                    }
                    name={errors.password}
                  />
                </CustomForm.FormBox>
              </CustomForm.FormContainer>
              <CustomForm.FormContainer>
                <CustomForm.FormLabel name="비밀번호 확인" isEssential={true} />
                <CustomForm.FormBox>
                  <CustomForm.FormInput
                    type="password"
                    name="passwordConfirm"
                    placeholder="비밀번호를 한번 더 입력해주세요"
                  />
                  <CustomForm.FormError
                    isDisplay={
                      errors.passwordConfirm !== undefined &&
                      touched.passwordConfirm
                    }
                    name={errors.passwordConfirm}
                  />
                </CustomForm.FormBox>
              </CustomForm.FormContainer>
              <CustomForm.FormContainer>
                <CustomForm.FormLabel name="이름" isEssential={true} />
                <CustomForm.FormBox>
                  <CustomForm.FormInput
                    type="text"
                    name="name"
                    placeholder="이름을 입력해주세요."
                  />
                  <CustomForm.FormError
                    isDisplay={errors.name !== undefined && touched.name}
                    name={errors.name}
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
                    name="파일 업로드"
                    onClick={handleChooseFile}
                  />
                  <CustomForm.FormDiscription name="이미지 크기의 최대용량은 10MB 입니다." />
                </CustomForm.FormBox>
              </CustomForm.FormContainer>
              <CustomForm.FormContainer>
                <CustomForm.FormLabel name="이메일" isEssential={true} />
                <CustomForm.FormBox type="column">
                  <CustomForm.FormBox>
                    <CustomForm.FormInput
                      type="text"
                      name="email"
                      placeholder="예 : reduck12@duckoo.com"
                    />
                    <CustomForm.FormButton
                      type="button"
                      onClick={() =>
                        handleRequestEmail(
                          values.email,
                          touched.email,
                          errors.email
                        )
                      }
                      name={
                        sendingEmail ? (
                          <LoadingIcon size="25px" />
                        ) : (
                          '인증번호 발송'
                        )
                      }
                    />
                  </CustomForm.FormBox>
                  {isSendEmail && (
                    <CustomForm.FormBox>
                      <input
                        type="text"
                        className="p-2 min-w-0 rounded-md shadow-sm flex-0 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                        ref={certificateNumberRef}
                        onChange={handleCertificateNumber}
                      />
                      <CustomForm.FormButton
                        type="button"
                        name="인증번호확인"
                        onClick={() => handleCheckEmail(values.email)}
                      />
                    </CustomForm.FormBox>
                  )}
                </CustomForm.FormBox>
              </CustomForm.FormContainer>
              <CustomForm.FormContainer>
                <CustomForm.FormLabel name="학교" />
                <CustomForm.FormBox>
                  <CustomForm.FormInput
                    type="text"
                    name="school"
                    placeholder="학교를 입력해주세요."
                  />
                </CustomForm.FormBox>
              </CustomForm.FormContainer>
              <CustomForm.FormContainer>
                <CustomForm.FormLabel name="직장" />
                <CustomForm.FormBox>
                  <CustomForm.FormInput
                    type="text"
                    name="company"
                    placeholder="직장을 입력해주세요."
                  />
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
              <Divider type="horizental" thin={2} margin={1} />
              <div className="text-center">
                <CustomForm.FormButton
                  type="submit"
                  disabled={isSubmitting}
                  name="회원가입"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
