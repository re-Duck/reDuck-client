import getCodeReview from '@/service/open-ai';
import { IContent } from '@/types/mygpt';
import { useCallback, useEffect, useRef, useState } from 'react';

function useGpt() {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const answerRef = useRef<HTMLFormElement>(null);

  const getAnswer = useCallback(async ({ code, question }: IContent) => {
    setAnswer('');
    const res = await getCodeReview({ code, question });
    setAnswer(res || '');
  }, []);

  const handdleSubmit = useCallback(async ({ code, question }: IContent) => {
    setIsAnswerOpen(true);
    await getAnswer({ code, question });
  }, []);

  useEffect(() => {
    if (isAnswerOpen || answer) {
      answerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAnswerOpen, answer]);

  return { handdleSubmit, answer, answerRef, isAnswerOpen };
}

export default useGpt;
