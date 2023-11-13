import { axios_delete } from '../base/api';

interface IDeletePost {
  postOriginId: string;
}

async function deletePost({ postOriginId }: IDeletePost) {
  const suburl = `/post/${postOriginId}`;

  const result = await axios_delete({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}

export default deletePost;
