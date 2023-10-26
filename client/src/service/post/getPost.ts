import { IBoardPostInformation } from '@/types';
import { axios_get } from '../base/api';

interface IGetPost {
  postOriginId: string;
}

async function getPost({ postOriginId }: IGetPost) {
  const suburl = `/post/detail/${postOriginId}`;
  const result = await axios_get<IBoardPostInformation>({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  return result.data;
}

export default getPost;
