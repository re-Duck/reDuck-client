import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '@/components';
import { Gpt } from '@/components/mygpt/gpt';
import getCodeReview from '@/service/open-ai';
import { useCallback } from 'react';

export default function GptPage() {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const getAnswer = useCallback(async () => {
    setAnswer('');
    const res = await getCodeReview({ code, question });
    setAnswer(res || '');
  }, [code, question]);

  useEffect(() => {
    if (isAnswerOpen || answer) {
      answerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAnswerOpen, answer]);

  return (
    <>
      <Layout>
        <Gpt>
          <Gpt.Title title="GPT" />
          <Gpt.ContentBox>
            <Gpt.SubTitle title="Code" />
            <Gpt.Content height="md" content={code} setContent={setCode} />
          </Gpt.ContentBox>

          <Gpt.ContentBox>
            <Gpt.SubTitle title="Question" />
            <div className="flex justify-center gap-4">
              <Gpt.Question content={question} setContent={setQuestion} />
              <Gpt.SendButton
                onClick={() => {
                  setIsAnswerOpen(true);
                  getAnswer();
                }}
              />
            </div>
          </Gpt.ContentBox>
        </Gpt>
      </Layout>

      {isAnswerOpen && (
        <div className="pb-10 bg-slate-200">
          <Gpt ref={answerRef}>
            <Gpt.SubTitle title="Answer" />
            {answer ? (
              <Gpt.Content
                height="md"
                content={answer}
                setContent={setAnswer}
                readOnly={true}
              />
            ) : (
              <Gpt.Loading />
            )}
          </Gpt>
        </div>
      )}
    </>
  );
}
