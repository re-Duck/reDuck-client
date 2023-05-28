import { axios_put } from './base/api';

interface updateCommtent {
  commentOriginId: string;
  token: string;
  content: string;
}

export const updateCommtent = async ({
  commentOriginId,
  token,
  content,
}: updateCommtent) => {
  const suburl = `/post/comment/${commentOriginId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const obj = { content, commentOriginId };
  const response = await axios_put({ suburl, headers, obj });

  return response.isOkay;
};
