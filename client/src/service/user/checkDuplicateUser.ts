// service
import { axios_get } from '../base/api';

export default async function checkDuplicateUser(id: string) {
  const suburl = `/user/duplicate/${id}`;

  const result = await axios_get({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  } else if (result.data) {
    throw 'duplicate';
  }
}
