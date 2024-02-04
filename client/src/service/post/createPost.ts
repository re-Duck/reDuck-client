// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from '../base/api';

interface ICreatePost {
  title: string;
  content: string;
}

interface Request {
  title: string;
  content: string;
  postOriginId: string;
  postType: 'qna' | 'stack';
  tags: string[];
}
async function createPost({ title, content }: ICreatePost) {
  const postOriginId = uuidv4();
  const suburl = '/post';

  const data: Request = {
    title,
    content,
    postOriginId,
    postType: 'qna',
    tags: [],
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
