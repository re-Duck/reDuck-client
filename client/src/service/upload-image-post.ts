// service
import { axios_post } from './base/api';

export async function uploadImagePost(
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
  const result = await axios_post(dataObject);

  if (result.isOkay) return result.data;
  else false;
}
