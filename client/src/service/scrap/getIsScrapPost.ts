import { axios_get } from '../base/api';

export default async function getIsScrapPost({
  postOriginId,
}: {
  postOriginId: string;
}) {
  const suburl = `scrap/posts/${postOriginId}/status`;

  const result = await axios_get<boolean>({ suburl });

  if (!result.isOkay || result.data === undefined) {
    throw result.error;
  }

  return result.data;
}
