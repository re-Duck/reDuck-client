// sercive
import { axios_post } from '../base/api';

export default async function requestFollow({ userId }: { userId: string }) {
  const suburl = '/follow';

  const data = { userId };

  const result = await axios_post({ suburl, data });

  if (!result.isOkay) {
    throw result.error;
  }
}
