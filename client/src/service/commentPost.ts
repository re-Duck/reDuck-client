// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from './base/api';

interface IBoardPost {
  content: string;
  postOriginId: string;
  commentOriginId: string;
  token: string;
}
export async function boardPost({
  content,
  postOriginId,
  token,
}: IBoardPost): Promise<void> {
  const commentOriginId = uuidv4();
  const suburl = '/post';
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const data = {
    content,
    postOriginId,
    commentOriginId,
  };

  const result = await axios_post({ suburl, headers, data });

  if (!result.isOkay) {
    alert(result.message);
  }
}
