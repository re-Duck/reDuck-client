import { getGptRemain } from '@/service/get-gpt-remain';
import getCodeReview from '@/service/open-ai';
import { postGptContent } from '@/service/post-gpt-count';
import { IContent } from '@/types/mygpt';
import { useCallback, useEffect, useRef, useState } from 'react';

function useGpt(accessToken: string) {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [remainUsageCount, setRemainUsageCount] = useState(0);

  const answerRef = useRef<HTMLFormElement>(null);

  const getAnswer = useCallback(async ({ code, question }: IContent) => {
    setAnswer('');
    const res = await getCodeReview({ code, question });
    setAnswer(res || '');
    return res;
  }, []);

  const handdleSubmit = useCallback(
    async ({ code, question }: IContent) => {
      setIsAnswerOpen(true);
      const gptAnswer = await getAnswer({ code, question });
      if (!gptAnswer) return;

      const data = {
        userCode: code,
        userQuestion: question,
        gptAnswer,
      };
      const count = await postGptContent({ data, accessToken });

      setRemainUsageCount(count);
    },
    [accessToken]
  );

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
