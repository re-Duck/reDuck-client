// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from './base/api';

interface ICommentPost {
  content: string;
  postOriginId: string | string[] | undefined;
  token: string;
}
export async function commentPost({
  content,
  postOriginId,
  token,
}: ICommentPost): Promise<void> {
  const commentOriginId = uuidv4();
  const suburl = '/post/comment';
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
    alert(result.error);
  }
}
