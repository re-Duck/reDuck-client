import { getGptRemain } from '@/service/get-gpt-remain';
import { useEffect, useState } from 'react';

function useRemainQuestion(accessToken: string) {
  const [leftQuestionCount, setLeftQuestionCount] = useState<number>(0);

  const getQuestionCount = async () => {
    //API
    if (!accessToken) return;
    const count = await getGptRemain({ accessToken });
    setLeftQuestionCount(count);
  };

  const isPossibleQuestion = () => {
    return leftQuestionCount > 0;
  };

  useEffect(() => {
    getQuestionCount();
  }, []);

  return {
    leftQuestionCount,
    isPossibleQuestion,
  };
}

export default useRemainQuestion;
