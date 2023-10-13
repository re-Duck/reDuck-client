// service
import { axios_put } from '../base/api';

interface IUpdatePost {
  title: string;
  content: string;
  accessToken: string;
  postOriginId: string;
}

interface Request {
  title: string;
  content: string;
  postOriginId: string;
  postType: 'qna' | 'stack';
}

async function updatePost({
  title,
  content,
  accessToken,
  postOriginId,
}: IUpdatePost) {
  const suburl = `/post/${postOriginId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const data: Request = {
    title,
    content,
    postOriginId,
    postType: 'qna',
  };

  const result = await axios_put<unknown, Request>({ suburl, headers, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default updatePost;
