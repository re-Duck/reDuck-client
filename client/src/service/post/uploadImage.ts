// service
import { axios_post } from '../base/api';

export default async function uploadImage(
  formData: FormData,
  accessToken: string | undefined
) {
  const dataObject = {
    suburl: '/post/image',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${accessToken}`,
    },
  };
  const result = await axios_post<string, FormData>(dataObject);

  if (!result.isOkay) {
    throw new Error(result.error);
  }

  return result.data;
}
