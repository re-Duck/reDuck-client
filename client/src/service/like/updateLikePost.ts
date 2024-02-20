import { axios_post } from '../base/api';

export default async function updateLikePost({
  postOriginId,
}: {
  postOriginId: string;
}) {
  const suburl = `/like/post/${postOriginId}`;

  const result = await axios_post({ suburl, data: {} });

  if (!result.isOkay) {
    console.log(result);
    throw new Error(result.error);
  }
}
