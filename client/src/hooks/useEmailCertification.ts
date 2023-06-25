// email
import { useState, useRef } from 'react';

// hooks
import { useModal } from './';

// types
import { EmailState } from '@/types';

// constant
import { ModalType, errorMessage, successMessage } from '@/constant';

// service
import { checkEmail, sendEmail } from '@/service/sign-up';
import {
  certificationNumberCheck,
  sendEditEmail,
} from '@/service/edit-profile';

interface IUseEmailCertificationProp {
  type: 'user' | 'school' | 'company';
  accessToken?: string;
}

interface ICheckEmailDto {
  email: string;
  number: string;
  type: 'user' | 'company' | 'school';
}

export default function useEmailCertification({
  type,
  accessToken,
}: IUseEmailCertificationProp) {
  const emailCertificationNumberRef = useRef<HTMLInputElement>(null);
  const [emailState, setEmailState] = useState<EmailState>(EmailState.None);
  const [certificationNumber, setCertificationNumber] = useState<string>('');
  const [emailAuthToken, setEmailAuthToken] = useState<string>('');

  const { openModal } = useModal();

  const handleSubmitEmail = async (email: string) => {
    setEmailState(EmailState.Submitting);
    // TODO: 이메일 전송확인 모달
    try {
      accessToken
        ? await sendEditEmail({
            data: {
              email,
            },
            accessToken,
          })
        : await sendEmail({ email });
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.sendingEmailSuccess,
      });
      setEmailState(EmailState.Submitted);
    } catch {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.failedSendingEmail,
      });
      setEmailState(EmailState.None);
    }
  };

  const handleCheckEmail = async (email: string) => {
    const dto: ICheckEmailDto = {
      email,
      number: certificationNumber,
      type,
    };
    const result = accessToken
      ? await certificationNumberCheck({
          data: dto,
          accessToken,
        })
      : await checkEmail(dto);
    if (result.isOkay) {
      setEmailAuthToken(result.data?.emailAuthToken);
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

  return {
    emailCertificationNumberRef,
    emailState,
    emailAuthToken,
    setCertificationNumber,
    handleSubmitEmail,
    handleCheckEmail,
  };
}
