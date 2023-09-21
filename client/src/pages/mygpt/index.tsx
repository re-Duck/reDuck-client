/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Layout, Gpt } from '@/components';

import { Formik, FormikHelpers } from 'formik';
import { IContent } from '@/types/mygpt';

import { useSelector } from 'react-redux';
import { useModal } from '@/hooks';
import useGpt from '@/hooks/mygpt/useGpt';

import { ModalType, errorMessage } from '@/constants/constant';

const initialLoginValue = {
  code: '',
  question: '',
};

export default function GptPage() {
  const { handdleSubmit, answer, answerRef, isAnswerOpen } = useGpt();
  const authState = useSelector((state: any) => state.auth);
  const { openModal } = useModal();

  const onSubmit = async (
    { code, question }: IContent,
    { setSubmitting }: FormikHelpers<IContent>
  ) => {
    authState.isLogin
      ? await handdleSubmit({ code, question })
      : openModal({ type: ModalType.ERROR, message: errorMessage.needLogin });
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
                    <Gpt.Remaining />
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
