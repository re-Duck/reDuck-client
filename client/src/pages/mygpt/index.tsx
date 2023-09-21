import React from 'react';
import { Layout, Gpt } from '@/components';
import { Formik } from 'formik';
import useGpt from '../../hooks/mygpt/useGpt';

const initialLoginValue = {
  code: '',
  question: '',
};

export default function GptPage() {
  const { handdleSubmit, answer, answerRef, isAnswerOpen } = useGpt();

  return (
    <>
      <Formik initialValues={initialLoginValue} onSubmit={handdleSubmit}>
        {({ isSubmitting }) => (
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
                    <Gpt.Question />
                    <Gpt.SendButton disabled={isSubmitting} />
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
