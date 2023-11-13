/* eslint-disable @typescript-eslint/no-explicit-any */
//core
import React from 'react';

//component
import { Layout, Gpt } from '@/components';

//constant
import { ModalType, errorMessage } from '@/constants/constant';

//hooks
import { useModal } from '@/hooks';
import useGpt from '@/hooks/mygpt/useGpt';

//type
import { IContent } from '@/types/mygpt';

//third party
import { Formik, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';

const initialLoginValue = {
  code: '',
  question: '',
};

export default function GptPage() {
  const authState = useSelector((state: any) => state.auth);
  const { openModal } = useModal();
  const accessToken = authState.token || '';

  const {
    handdleSubmit,
    answer,
    answerRef,
    isAnswerOpen,
    remainUsageCount,
    isPossibleQuestion,
  } = useGpt(accessToken);

  const validate = () => {
    if (!authState.isLogin) {
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
    <>
      <Formik initialValues={initialLoginValue} onSubmit={onSubmit}>
        {({ isSubmitting, values }) => (
          <>
            <Layout>
              <Gpt>
                <Gpt.Title title="GPT" />
                <Gpt.ContentBox>
                  <Gpt.SubTitle title="Code" />
                  <Gpt.Content height="md" name="code" />
                </Gpt.ContentBox>

                <Gpt.ContentBox>
                  <div className="flex items-end justify-between">
                    <Gpt.SubTitle title="Question" />
                    <Gpt.Remaining leftQuestionCount={remainUsageCount} />
                  </div>
                  <div className="flex justify-center gap-4">
                    <Gpt.Question>
                      <Gpt.SendButton
                        disabled={isSubmitting || values.question === ''}
                      />
                    </Gpt.Question>
                  </div>
                </Gpt.ContentBox>
              </Gpt>
            </Layout>
            {isAnswerOpen && (
              <div className="pb-10 bg-slate-200">
                <Gpt ref={answerRef}>
                  <Gpt.SubTitle title="Answer" />
                  {answer ? (
                    <Gpt.Content height="md" content={answer} readOnly={true} />
                  ) : (
                    <Gpt.Loading />
                  )}
                </Gpt>
              </div>
            )}
          </>
        )}
      </Formik>
    </>
  );
}
