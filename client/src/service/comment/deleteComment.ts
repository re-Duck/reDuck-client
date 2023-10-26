import { axios_delete } from '../base/api';

interface IdeleteCommtent {
  commentOriginId: string;
  token: string;
}

async function deleteCommtent({ commentOriginId, token }: IdeleteCommtent) {
  const suburl = `/post/comment/${commentOriginId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const result = await axios_delete({ suburl, headers });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default deleteCommtent;
