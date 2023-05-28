import { axios_put } from './base/api';

interface updateCommtent {
  commentOriginId: string;
  postOriginId: string;
  token: string;
  content: string;
}

export const updateCommtent = async ({
  commentOriginId,
  postOriginId,
  token,
  content,
}: updateCommtent) => {
  const suburl = `/post/comment/${commentOriginId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const obj = { content, commentOriginId, postOriginId };
  const response = await axios_put({ suburl, headers, obj });

  return response.isOkay;
};
