// service
import { axios_post } from './base/api';

interface ILoginPost {
  flag: boolean;
  data: object;
}

export async function loginPost(data: object): Promise<ILoginPost> {
  const suburl = '/login';

  const result: any = await axios_post({ suburl, data });
  if (result.isOkay) {
    // TODO: set-cookie를 통해 자동으로 쿠키에 저장
    document.cookie = `accessToken=${result.data.accessToken}`;
  }
  const returnValue = {
    flag: result.isOkay,
    data: result.data,
  };
  return returnValue;
}
