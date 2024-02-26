import { axios_put } from '../base/api';

interface IUpdateCommtent {
  commentOriginId: string;
  content: string;
}

async function updateCommtent({ commentOriginId, content }: IUpdateCommtent) {
  const suburl = `/post/comment/${commentOriginId}`;

  const data = { content, commentOriginId };

  const result = await axios_put({ suburl, data });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default updateCommtent;
