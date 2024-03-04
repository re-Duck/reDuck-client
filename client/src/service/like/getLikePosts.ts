import { axios_get } from '../base/api';

export default async function getLikePosts() {
  const suburl = '/like/post';

  const result = await axios_get({ suburl });

  if (!result.isOkay) {
    throw result.error;
  }

  return result.data;
}
