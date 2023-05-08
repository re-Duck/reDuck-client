import { axios_get } from './base/api';

const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWR1Y2siLCJyb2xlcyI6W3sibmFtZSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgzNTMwMTExLCJleHAiOjE2ODM2MTY1MTF9._0j4R-9x1IfnEG9IBe9wfQafY8Fpfphsn54Kt6__8C4`,
};

export const getFirstPosts = async () => {
  const suburl = '/post?postType=type&page=10';
  const response = await axios_get({ suburl, params: headers });
  console.log(response);
};

export const getNewPosts = async (postOriginId: string) => {
  const suburl = `/post/${postOriginId}?postType=type&page=10`;
  const response = await axios_get({ suburl, params: headers });
  console.log(response);
};
