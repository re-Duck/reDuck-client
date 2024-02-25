'use client';

//constant
import { ModalType, errorMessage } from '@/constants/constant';

//hooks
import useModal from '@/hooks/modal/useModal';

//type
import { IContent } from '@/types/mygpt';
import { IReduxState } from '@/types/redux/IReduxState';

//third party
import { Formik, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import useGpt from './hooks/useGpt';
import SNB from './components/SNB';
import ChatBox from './components/ChatBox';
import ChatInput from './components/ChatInput';

export default function GptPage() {
  const user = useSelector((state: IReduxState) => state.auth);
  const { openModal } = useModal();

  const {
    handdleSubmit,
    answer,
    answerRef,
    isAnswerOpen,
    remainUsageCount,
    isPossibleQuestion,
  } = useGpt(user);

  const validate = () => {
    if (!user.userId) {
      openModal({ type: ModalType.ERROR, message: errorMessage.needLogin });
      return false;
    }
    if (!isPossibleQuestion()) {
      openModal({ type: ModalType.ERROR, message: errorMessage.maxQuestion });
      return false;
    }
    return true;
  };

  const onSubmit = async (
    { code, question }: IContent,
    { setSubmitting }: FormikHelpers<IContent>
  ) => {
    try {
      if (validate()) {
        await handdleSubmit({ code, question });
      }
    } catch (e) {
      openModal({ type: ModalType.ERROR, message: errorMessage.networkError });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full h-full gap-5 pt-12 pb-8">
      <SNB />
      <div className="flex flex-col w-full">
        <ChatBox />
        <ChatInput />
      </div>
    </div>
  );
}
