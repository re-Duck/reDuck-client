// services
import { axios_get, axios_post } from './base/api';

export async function SignupPost(data: object): Promise<boolean> {
  const suburl = '/user';

  const result = await axios_post({ suburl, data });
  if (result.isOkay) {
    return true;
  } else {
    alert(result.message);
    return false;
  }
}

export async function checkID(id: string): Promise<object> {
  const suburl = `/user/duplicate/${id}`;

  const result = await axios_get({ suburl });
  if (result.isOkay) {
    return {
      state: true,
      isDuplicate: result.data,
    };
  } else {
    return {
      state: false,
      message: result.message,
    };
  }
}

export async function sendEmail(data: object) {
  const suburl = '/auth/email';

  const result = await axios_post({ suburl, data });
  if (result.isOkay) {
    return true;
  } else {
    return false;
  }
}

export async function checkEmail(data: object) {
  const suburl = '/auth/email/user';

  const result = await axios_post({ suburl, data });
  if (result.isOkay) {
    return true;
  } else {
    return false;
  }
}
