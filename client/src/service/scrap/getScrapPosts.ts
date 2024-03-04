import { axios_get } from '../base/api';

import { IResponseRawData, IPostInformation } from '@/types';

export default async function getScrapPosts() {
  const suburl = '/scrap/posts';

  const result = await axios_get({ suburl });

  if (!result.isOkay) {
    return result.error;
  }

  const rawData = result.data as IResponseRawData<
    Omit<IPostInformation, 'commentsCount' | 'hits' | 'likes'>
  >;

  return rawData.data;
}
