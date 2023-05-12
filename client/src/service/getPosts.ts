import { axios_get } from './base/api';
import { POSTS_INISIATE_VALUE } from '@/constant';

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
};

export const getAllPosts = async ({ pageParam = '' }) => {
  const suburl =
    pageParam === ''
      ? `/post?postType=qna&postType=stack&page=10`
      : `/post/${pageParam}?postType=stack&page=10`;
  const response = await axios_get({ suburl, headers });
  const data = response.data;
  const IS_ARRAY = Array.isArray(data);

  if (IS_ARRAY) {
    const nextPageParms = data[data.length - 1]?.postOriginId;
    return { data, nextPageParms };
  }
  return POSTS_INISIATE_VALUE;
};
