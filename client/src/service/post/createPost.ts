// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from '../base/api';
import { PostType } from '@/types';

interface Request {
  title: string;
  content: string;
  postOriginId: string;
  postType: PostType;
  tags: string[];
}
async function createPost({
  title,
  content,
  postType,
  tags,
}: Omit<Request, 'postOriginId'>) {
  const postOriginId = uuidv4();
  const suburl = '/post';

  const data: Request = {
    title,
    content,
    postOriginId,
    postType,
    tags,
  };

  const result = await axios_post<unknown, Request>({
    suburl,
    data,
  });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  return postOriginId;
}

export default createPost;
