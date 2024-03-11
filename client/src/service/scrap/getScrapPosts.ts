import { axios_get } from '../base/api';

import { IPostInformation } from '@/types';

export default async function getScrapPosts() {
  const suburl = '/scrap/posts';

  const result = await axios_get<
    Omit<IPostInformation, 'commentsCount' | 'hits' | 'likes'>
  >({ suburl });

  if (!result.isOkay) {
    return result.error;
  }

  return result.data;
}
