import { axios_get } from '../base/api';

import { IResponseRawData } from '@/types';

export default async function getIsLikePost({
  postOriginId,
}: {
  postOriginId: string;
}) {
  const suburl = `like/posts/${postOriginId}/status`;

  const result = await axios_get({ suburl });

  if (!result.isOkay) {
    throw result.error;
  }

  const rawData = result.data as IResponseRawData<boolean>;

  return rawData.data;
}
