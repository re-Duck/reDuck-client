import { Layout } from '@/components';
import { Gpt } from '@/components/mygpt/gpt';
import React, { useEffect, useRef, useState } from 'react';

export default function GptPage() {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAnswerOpen) {
      answerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAnswerOpen]);

  return (
    <>
      <Layout>
        <Gpt>
          <Gpt.Title title="GPT" />
          <Gpt.ContentBox>
            <Gpt.SubTitle title="Code" />
            <Gpt.Content height="md" />
          </Gpt.ContentBox>

          <Gpt.ContentBox>
            <Gpt.SubTitle title="Question" />
            <div className="flex justify-center gap-4">
              <Gpt.Content height="sm" />
              <Gpt.SendButton setIsAnswerOpen={setIsAnswerOpen} />
            </div>
          </Gpt.ContentBox>
        </Gpt>
      </Layout>

      {isAnswerOpen && (
        <div className="pb-10 bg-slate-200">
          <Gpt ref={answerRef}>
            <Gpt.SubTitle title="Answer" />
            <Gpt.Loading />
            {/* <Gpt.Content height="md" isLoading={true} /> */}
          </Gpt>
        </div>
      )}
    </>
  );
}
