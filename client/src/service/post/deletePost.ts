import { axios_delete } from '../base/api';

interface IDeletePost {
  postOriginId: string;
  token: string;
}

async function deletePost({ postOriginId, token }: IDeletePost) {
  const suburl = `/post/${postOriginId}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const result = await axios_delete({ suburl, headers });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default deletePost;
