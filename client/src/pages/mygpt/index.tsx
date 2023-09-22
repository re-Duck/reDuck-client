/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Layout, Gpt } from '@/components';

import { Formik, FormikHelpers } from 'formik';
import { IContent } from '@/types/mygpt';

import { useSelector } from 'react-redux';
import { useModal } from '@/hooks';
import useGpt from '@/hooks/mygpt/useGpt';

import { ModalType, errorMessage } from '@/constants/constant';
import useRemainQuestion from '@/hooks/mygpt/useRemainQuestion';

const initialLoginValue = {
  code: '',
  question: '',
};

export default function GptPage() {
  const { handdleSubmit, answer, answerRef, isAnswerOpen } = useGpt();
  const authState = useSelector((state: any) => state.auth);
  const { openModal } = useModal();
  const { leftQuestionCount, isPossibleQuestion } = useRemainQuestion();

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
    if (validate()) {
      await handdleSubmit({ code, question });
    }
    setSubmitting(false);
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
                    <Gpt.Remaining leftQuestionCount={leftQuestionCount} />
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
