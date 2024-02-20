// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from '../base/api';

interface ICreateComment {
  content: string;
  postOriginId: string | string[] | undefined;
  parentCommentOriginId?: string;
}

interface Request {
  content: string;
  postOriginId: string | string[] | undefined;
  commentOriginId: string;
}

async function createComment({
  content,
  postOriginId,
  parentCommentOriginId = 'root',
}: ICreateComment) {
  const commentOriginId = uuidv4();
  const suburl = '/post/comment';

  const data = {
    content,
    postOriginId,
    commentOriginId,
    parentCommentOriginId,
  };

  const result = await axios_post<unknown, Request>({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default createComment;
