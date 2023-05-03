// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from './base/api';

export async function boardPost(
  title: string,
  blobFile: Blob
): Promise<boolean> {
  const postOriginId = uuidv4();
  const suburl = `/post/${postOriginId}`;
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  };

  const formData = new FormData();
  const postDto = {
    title,
    postOriginId,
    userId: 'reduck',
    content: 'this is the first posting!!',
    boardType: 'qna',
    temporary: 'true',
  };
  formData.append('postDto', JSON.stringify(postDto));
  formData.append('multipartFiles', blobFile);

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
