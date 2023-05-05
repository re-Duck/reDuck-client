// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from './base/api';

export async function boardPost(
  title: string,
  blobFile: Blob
): Promise<boolean> {
  const postOriginId = uuidv4();
  const suburl = '/post';
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWR1Y2siLCJyb2xlcyI6W3sibmFtZSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgzMjYzMDY0LCJleHAiOjE2ODMzNDk0NjR9.PNBxX2zkDeI4npCD0NrCghs2xaGjARowlVvKv1u-7UQ`,
  };

  const formData = new FormData();
  const postDto = {
    title,
    postOriginId,
    userId: 'reduck',
    postType: 'qna',
  };
  formData.append('postDto', JSON.stringify(postDto));
  formData.append('file', blobFile);

  const result = await axios_post({ suburl, headers, data: formData });

  if (result.isOkay) {
    // TODO: 성공 로직
    console.log(result.data);
    return true;
  } else {
    alert(result.message);
    return false;
  }
}
