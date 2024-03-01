// service
import { PostType } from '@/types';
import { axios_put } from '../base/api';

interface Request {
  title: string;
  content: string;
  postOriginId: string;
  postType: PostType;
}

async function updatePost({ title, content, postOriginId, postType }: Request) {
  const suburl = `/post/${postOriginId}`;

  const data: Request = {
    title,
    content,
    postOriginId,
    postType,
  };

  const result = await axios_put<unknown, Request>({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default updatePost;
