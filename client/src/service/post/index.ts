// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from '../base/api';

interface ICreatePost {
  title: string;
  content: string;
  accessToken: string;
}

interface PostRequest {
  title: string;
  content: string;
  postOriginId: string;
  postType: 'qna' | 'stack';
}
async function createPost({ title, content, accessToken }: ICreatePost) {
  const postOriginId = uuidv4();
  const suburl = '/post';
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const data: PostRequest = {
    title,
    content,
    postOriginId,
    postType: 'qna',
  };

  const result = await axios_post<unknown, PostRequest>({
    suburl,
    headers,
    data,
  });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  return result;
}

export const postManager = { createPost };
