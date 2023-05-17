import { axios_get } from './base/api';
import { POSTS_INISIATE_VALUE } from '@/constant';

const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWR1Y2siLCJyb2xlcyI6W3sibmFtZSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjg0MzIwMzQ0LCJleHAiOjE2ODQ0MDY3NDR9.FQYyrtw8bfaUYvELweDe776_UVzdsKJAykj4y1ujQVE`,
};

export const getAllPosts = async ({ pageParam = '' }) => {
  const params = { pageParam, postType: ['stack', 'qna'], page: 10 };
  const suburl = '/post';

  const response = await axios_get({ suburl, params });
  const data = response.data;
  const IS_ARRAY = Array.isArray(data);

  if (IS_ARRAY) {
    const nextPageParms = data[data.length - 1]?.postOriginId;
    return { data, nextPageParms };
  }
  return POSTS_INISIATE_VALUE;
};
