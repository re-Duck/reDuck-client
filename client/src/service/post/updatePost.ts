// service
import { axios_put } from '../base/api';

interface IUpdatePost {
  title: string;
  content: string;
  postOriginId: string;
}

interface Request {
  title: string;
  content: string;
  postOriginId: string;
  postType: 'qna' | 'stack';
}

async function updatePost({ title, content, postOriginId }: IUpdatePost) {
  const suburl = `/post/${postOriginId}`;

  const data: Request = {
    title,
    content,
    postOriginId,
    postType: 'qna',
  };

  const result = await axios_put<unknown, Request>({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default updatePost;
