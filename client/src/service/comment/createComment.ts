// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from '../base/api';

interface ICreateComment {
  content: string;
  postOriginId: string | string[] | undefined;
  token: string;
}

interface Request {
  content: string;
  postOriginId: string | string[] | undefined;
  commentOriginId: string;
}

async function createComment({ content, postOriginId, token }: ICreateComment) {
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

  const result = await axios_post<unknown, Request>({ suburl, headers, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default createComment;
