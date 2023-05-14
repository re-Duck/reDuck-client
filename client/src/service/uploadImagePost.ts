// service
import { axios_post } from './base/api';

export async function uploadImagePost(formData: FormData) {
  const dataObject = {
    suburl: '/post/image',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  const result = await axios_post(dataObject);

  if (result.isOkay) return result.data;
  else false;
}
