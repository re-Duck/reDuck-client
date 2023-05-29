import { axios_delete } from './base/api';

interface IDeletePost {
  postOriginId: string;
  token: string;
  callback: () => void;
}
export const deletePost = async ({
  postOriginId,
  token,
  callback,
}: IDeletePost) => {
  const suburl = `/post/${postOriginId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios_delete({ suburl, headers });

  if (response.isOkay) {
    callback();
  }
};
