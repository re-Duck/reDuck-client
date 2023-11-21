// service
import { axios_delete } from '../base/api';

export default async function deleteUser() {
  const suburl = '/user';

  const result = await axios_delete({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}
