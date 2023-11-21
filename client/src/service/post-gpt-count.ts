import { axios_post } from './base/api';

interface GptContentType {
  userCode: string;
  userQuestion: string;
  gptAnswer: string;
}

interface IPostGptContent {
  data: GptContentType;
}

interface IPostGptContentResponse {
  data: {
    remainUsageCount: number;
  };
}

export async function postGptContent({ data }: IPostGptContent) {
  const suburl = '/chat-gpt';

  const result = await axios_post<IPostGptContentResponse, GptContentType>({
    suburl,
    data,
  });
  if (!result.isOkay) {
    throw new Error('사용횟수 감소가 실패했습니다.');
  }
  const {
    data: { remainUsageCount },
  } = result.data as IPostGptContentResponse;
  return remainUsageCount;
}
