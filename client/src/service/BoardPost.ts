// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from './base/api';
import { makeJsonToBlob } from '@/util';

export async function boardPost(
  title: string,
  blobFile: Blob
): Promise<boolean> {
  const postOriginId = uuidv4();
  const suburl = '/post';
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZWR1Y2siLCJyb2xlcyI6W3sibmFtZSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNjgzNjM1NzI4LCJleHAiOjE2ODM3MjIxMjh9.WkRuNU6MrpAz0AmRobQfy3Qndxwuh2NNsKg1543f07Y`,
  };

  const formData = new FormData();
  const postDto = {
    title,
    postOriginId,
    userId: 'reduck',
    postType: 'qna',
  };
  const blobPostDto = makeJsonToBlob(postDto);

  formData.append('postDto', blobPostDto);
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
