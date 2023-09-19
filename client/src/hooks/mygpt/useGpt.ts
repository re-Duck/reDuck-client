import getCodeReview from '@/service/open-ai';
import { useCallback, useEffect, useRef, useState } from 'react';

interface IContent {
  code: string;
  question: string;
}

function useGpt() {
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

  return { handdleSubmit, answer, answerRef, isAnswerOpen };
}

export default useGpt;
