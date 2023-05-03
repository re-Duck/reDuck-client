// services
import { axios_post } from './base/api';

export async function SignupPost(data: object): Promise<boolean> {
  const suburl = '/user';

  const result = await axios_post({ suburl, data });
  if (result.isOkay) {
    // TODO: 성공로직
    console.log(result.data);
    return true;
  } else {
    alert(result.message);
    return false;
  }
}
