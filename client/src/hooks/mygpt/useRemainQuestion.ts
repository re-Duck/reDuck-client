import { getGptRemain } from '@/service/get-gpt-remain';
import { useQuery } from '@tanstack/react-query';

function useRemainQuestion(accessToken: string, answer: string) {
  const { data: leftQuestionCount } = useQuery({
    queryKey: ['leftQuestionCount', answer],
    queryFn: async () => await getGptRemain({ accessToken }),
    initialData: 0,
    enabled: !!accessToken,
  });
  const isPossibleQuestion = () => {
    return leftQuestionCount > 0;
  };

  return {
    leftQuestionCount,
    isPossibleQuestion,
  };
}

export default useRemainQuestion;
