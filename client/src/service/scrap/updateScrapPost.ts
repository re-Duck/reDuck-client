import { axios_post } from '../base/api';

export default async function updateScrapPost({
  postOriginId,
}: {
  postOriginId: string;
}) {
  const suburl = `/scrap/posts/${postOriginId}`;

  const result = await axios_post({ suburl, data: {} });

  if (!result.isOkay) {
    throw result.error;
  }
}
