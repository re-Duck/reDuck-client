import { axios_post } from './base/api';

interface GptContentType {
  userCode: string;
  userQuestion: string;
  gptAnswer: string;
}

interface IPostGptContent {
  data: GptContentType;
  accessToken: string;
}

interface IPostGptContentResponse {
  data: {
    remainUsageCount: number;
  };
}

export async function postGptContent({ data, accessToken }: IPostGptContent) {
  const suburl = '/chat-gpt';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const result = await axios_post<IPostGptContentResponse, GptContentType>({
    suburl,
    headers,
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
