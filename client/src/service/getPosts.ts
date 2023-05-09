import { axios_get } from './base/api';

const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWR1Y2siLCJyb2xlcyI6W3sibmFtZSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgzNjM1NzI4LCJleHAiOjE2ODM3MjIxMjh9.WkRuNU6MrpAz0AmRobQfy3Qndxwuh2NNsKg1543f07Y`,
};

export const getFirstPosts = async (postOriginId: string) => {
  const suburl =
    postOriginId === ''
      ? `/post?postType=qna&page=10`
      : `/post/${postOriginId}?postType=qna&page=10`;
  const response = await axios_get({ suburl, headers });
  console.log(response);
};
