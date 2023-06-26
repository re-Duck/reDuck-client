// service
import { axios_put } from './base/api';

interface IBoardPost {
  title: string;
  content: string;
  accessToken: string;
  postOriginId: string;
}
export async function boardUpdate({
  title,
  content,
  accessToken,
  postOriginId,
}: IBoardPost) {
  const suburl = `/post/${postOriginId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    title,
    content,
    postOriginId,
    postType: 'qna',
  };

  const result = await axios_put({ suburl, headers, data });

  return result.isOkay;
}
