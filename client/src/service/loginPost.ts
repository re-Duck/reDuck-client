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
    sessionStorage.setItem('accessToken', result.data.accessToken);
    sessionStorage.setItem('refreshToken', result.data.refreshToken);
  }
  const returnValue = {
    flag: result.isOkay,
    data: result.data,
  };
  return returnValue;
}
