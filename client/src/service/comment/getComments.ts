import { axios_get } from '../base/api';

import { IComment, IResponseRawData } from '@/types';

export default async function getComments({
  postOriginId,
}: {
  postOriginId: string;
}) {
  const suburl = `/post/${postOriginId}/comments`;

  const result = await axios_get({ suburl });

  if (!result.isOkay) {
    throw result.error;
  }

  const rawData = result.data as IResponseRawData<IComment[]>;

  return rawData.data;
}
