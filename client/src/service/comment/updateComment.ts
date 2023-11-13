import { axios_put } from '../base/api';

interface IUpdateCommtent {
  commentOriginId: string;
  postOriginId: string;
  content: string;
}

async function updateCommtent({
  commentOriginId,
  postOriginId,
  content,
}: IUpdateCommtent) {
  const suburl = `/post/comment/${commentOriginId}`;
  const data = { content, commentOriginId, postOriginId };
  const result = await axios_put({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default updateCommtent;
