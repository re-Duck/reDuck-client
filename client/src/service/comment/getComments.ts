import { axios_get } from '../base/api';

import { IComment } from '@/types';

export default async function getComments({
  postOriginId,
}: {
  postOriginId: string;
}) {
  const suburl = `/post/${postOriginId}/comments`;

  const result = await axios_get<IComment[]>({ suburl });

  if (!result.isOkay) {
    throw result.error;
  }

  return result.data;
}
