import { axios_delete } from './base/api';

interface deleteCommtent {
  commentOriginId: string;
  token: string;
  callback: () => void;
}

export const deleteCommtent = async ({
  commentOriginId,
  token,
  callback,
}: deleteCommtent) => {
  const suburl = `/post/comment/${commentOriginId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios_delete({ suburl, headers });

  if (response.isOkay) {
    callback();
  }
};
