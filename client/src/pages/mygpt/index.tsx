import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '@/components';
import { Gpt } from '@/components/mygpt/gpt';
import getCodeReview from '@/service/open-ai';
import { useCallback } from 'react';
import { Formik } from 'formik';

interface IContent {
  code: string;
  question: string;
}

const initialLoginValue = {
  code: '',
  question: '',
};

export default function GptPage() {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const answerRef = useRef<HTMLFormElement>(null);

  const getAnswer = useCallback(async ({ code, question }: IContent) => {
    setAnswer('');
    const res = await getCodeReview({ code, question });
    setAnswer(res || '');
  }, []);

  const handdleSubmit = useCallback(
    async (
      { code, question }: IContent,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      setIsAnswerOpen(true);
      setSubmitting(true);
      await getAnswer({ code, question });
      setSubmitting(false);
    },
    []
  );
  useEffect(() => {
    if (isAnswerOpen || answer) {
      answerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAnswerOpen, answer]);

  return (
    <>
      <Formik initialValues={initialLoginValue} onSubmit={handdleSubmit}>
        {({ errors, isSubmitting }) => (
          <>
            <Layout>
              <Gpt>
                <Gpt.Title title="GPT" />
                <Gpt.ContentBox>
                  <Gpt.SubTitle title="Code" />
                  <Gpt.Content height="md" name="code" />
                </Gpt.ContentBox>

                <Gpt.ContentBox>
                  <Gpt.SubTitle title="Question" />
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
