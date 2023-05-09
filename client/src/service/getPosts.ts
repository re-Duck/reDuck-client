import { axios_get } from './base/api';

const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWR1Y2siLCJyb2xlcyI6W3sibmFtZSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgzNjM1NzI4LCJleHAiOjE2ODM3MjIxMjh9.WkRuNU6MrpAz0AmRobQfy3Qndxwuh2NNsKg1543f07Y`,
};

export const getAllPosts = async ({ pageParam = '' }) => {
  //TODO: try catch
  const suburl =
    pageParam === ''
      ? `/post?postType=qna&page=10`
      : `/post/${pageParam}?postType=qna&page=10`;
  const response = await axios_get({ suburl, headers });
  const data = response.data;
  const IS_ARRAY = Array.isArray(data);

  if (IS_ARRAY) {
    const nextPageParms = data[data.length - 1]?.postOriginId;
    return { data, nextPageParms };
  }
  return null;
};
