import { axios_get } from '../base/api';

export default async function getIsLikePost({
  postOriginId,
}: {
  postOriginId: string;
}) {
  const suburl = `like/posts/${postOriginId}/status`;

  const result = await axios_get<boolean>({ suburl });

  if (!result.isOkay) {
    throw result.error;
  }

  return result.data;
}
