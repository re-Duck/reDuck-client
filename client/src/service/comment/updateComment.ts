import { axios_put } from '../base/api';

interface IUpdateCommtent {
  commentOriginId: string;
  postOriginId: string;
  token: string;
  content: string;
}

async function updateCommtent({
  commentOriginId,
  postOriginId,
  token,
  content,
}: IUpdateCommtent) {
  const suburl = `/post/comment/${commentOriginId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const data = { content, commentOriginId, postOriginId };
  const result = await axios_put({ suburl, headers, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default updateCommtent;
