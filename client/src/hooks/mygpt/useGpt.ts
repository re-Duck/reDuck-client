//core
import { useEffect, useRef, useState } from 'react';
//service
import { getGptRemain } from '@/service/get-gpt-remain';
import getCodeReview from '@/service/open-ai';
import { postGptContent } from '@/service/post-gpt-count';
//types
import { IContent } from '@/types/mygpt';

function useGpt(accessToken: string) {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [remainUsageCount, setRemainUsageCount] = useState(0);

  const answerRef = useRef<HTMLFormElement>(null);

  const getAnswer = async ({ code, question }: IContent) => {
    setAnswer('');
    const res = await getCodeReview({ code, question });

    return res;
  };

  const handdleSubmit = async ({ code, question }: IContent) => {
    setIsAnswerOpen(true);
    const gptAnswer = await getAnswer({ code, question });
    if (!gptAnswer) return;

    const data = {
      userCode: code,
      userQuestion: question,
      gptAnswer,
    };
    const count = await postGptContent({ data, accessToken });
    setAnswer(gptAnswer || '');
    setRemainUsageCount(count);
  };

  const isPossibleQuestion = () => {
    return remainUsageCount > 0;
  };

  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      const count = await getGptRemain({ accessToken });
      setRemainUsageCount(count);
    })();
  }, [accessToken]);

  useEffect(() => {
    if (isAnswerOpen || answer) {
      answerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAnswerOpen, answer]);

  return {
    answer,
    answerRef,
    remainUsageCount,
    isAnswerOpen,
    isPossibleQuestion,
    handdleSubmit,
  };
}

export default useGpt;
