import { axios_delete } from '../base/api';

interface IdeleteCommtent {
  commentOriginId: string;
}

async function deleteCommtent({ commentOriginId }: IdeleteCommtent) {
  const suburl = `/post/comment/${commentOriginId}`;

  const result = await axios_delete({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default deleteCommtent;
