// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from './base/api';

interface IBoardPost {
  title: string;
  content: string;
  accessToken: string;
}
export async function boardPost({ title, content, accessToken }: IBoardPost) {
  const postOriginId = uuidv4();
  const suburl = '/post';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    title,
    content,
    postOriginId,
    userId: 'reduck',
    postType: 'qna',
  };

  const result = await axios_post({ suburl, headers, data });

  if (!result.isOkay) {
    alert(result.message);
  }
  return postOriginId;
}
