import { axios_get } from './base/api';

interface IGptRemainUsage {
  accessToken: string;
}
interface ResponseType {
  data: {
    remainUsageCount: number;
  };
}

export async function getGptRemain({ accessToken }: IGptRemainUsage) {
  const suburl = '/chat-gpt/remain-usage';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const result = await axios_get<ResponseType>({ suburl, headers });
  if (!result.isOkay) {
    throw new Error('GPT3의 사용량을 불러오는데 실패했습니다.');
  }

  const {
    data: { remainUsageCount },
  } = result.data as ResponseType;
  return remainUsageCount;
}
