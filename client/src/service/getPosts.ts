import { axios_get } from './base/api';
import { POSTS_INISIATE_VALUE } from '@/constant';

const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWR1Y2siLCJyb2xlcyI6W3sibmFtZSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgzOTAxMDczLCJleHAiOjE2ODM5ODc0NzN9.DfSNToZubPJV1KqUb88PbTE-uJPiOSlnDbhjtA05hk0`,
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
