// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post, axios_put } from './base/api';

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

  const obj = {
    title,
    content,
    postOriginId,
    postType: 'qna',
  };

  const result = await axios_put({ suburl, headers, obj });

  return result.isOkay;
}
