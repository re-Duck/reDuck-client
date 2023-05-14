import { axios_get } from './base/api';
import { POSTS_INISIATE_VALUE } from '@/constant';

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
};

export const getAllPosts = async ({ pageParam = '' }) => {
  const params = { pageParam, postType: ['stack', 'qna'], page: 10 };
  const suburl = '/post';

  const response = await axios_get({ suburl, headers, params });
  const data = response.data;
  const IS_ARRAY = Array.isArray(data);

  if (IS_ARRAY) {
    const nextPageParms = data[data.length - 1]?.postOriginId;
    return { data, nextPageParms };
  }
  return POSTS_INISIATE_VALUE;
};
