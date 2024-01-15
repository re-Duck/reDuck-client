// react, next
import React, { useState, useRef } from 'react';

// 전역
import useModal from '@/hooks/modal/useModal';

// types
import { EmailState, EmailType } from '@/types';

// constant
import { ModalType, successMessage, errorMessage } from '@/constants/constant';

// services
import { emailManager } from '@/service/email';

function useEmail(type: EmailType) {
  const { openModal } = useModal();

  const certificateRef = useRef<HTMLInputElement>(null);
  const [certificateNumber, setCertificationNumber] = useState<string>('');

  const [emailState, setEmailState] = useState<EmailState>(EmailState.None);
  const [emailAuthToken, setEmailAuthToken] = useState<string>('');

  const handleChangeCertifiactionNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCertificationNumber(e.target.value);
  };

  const handleRequestEmail = async (email: string) => {
    setEmailState(EmailState.Submitting);
    try {
      switch (type) {
        case 'SIGNUP': {
          await emailManager.sendSignUpEmail({ email });
          break;
        }
        default: {
          await emailManager.sendProfileEmail({ email });
        }
      }
      setEmailState(EmailState.Submitted);
      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.sendingEmailSuccess,
      });
    } catch {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.failedSendingEmail,
      });
      setEmailState(EmailState.None);
    }
  };

  const handleCheckEmail = async (email: string) => {
    let token = '';
    try {
      switch (type) {
        case 'SIGNUP': {
          token = await emailManager.checkSignUpNumber({
            email,
            number: parseInt(certificateNumber),
          });
          break;
        }
        default: {
          token = await emailManager.checkProfileEmailNumber({
            email,
            number: parseInt(certificateNumber),
            type,
          });
        }
      }
      setEmailAuthToken(token);
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

  return {
    certificateRef,
    emailState,
    emailAuthToken,
    handleChangeCertifiactionNumber,
    handleRequestEmail,
    handleCheckEmail,
  };
}

export default useEmail;
