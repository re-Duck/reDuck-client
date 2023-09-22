import { useEffect, useState } from 'react';

function useRemainQuestion() {
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [maxCount, setMaxCount] = useState(10);
  const getQuestionCount = async () => {
    //API
    setQuestionCount(0);
    setMaxCount(10);
  };

  const isPossibleQuestion = () => {
    return questionCount < maxCount;
  };

  useEffect(() => {
    getQuestionCount();
  }, []);

  return {
    leftQuestionCount: maxCount - questionCount,
    isPossibleQuestion,
  };
}

export default useRemainQuestion;
