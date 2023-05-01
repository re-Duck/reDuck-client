// 게시글 id 생성
import { v4 as uuidv4 } from 'uuid';

// service
import { axios_post } from './base/api';

export async function boardPost(sendData: object): Promise<boolean> {
  const postOriginId = uuidv4();
  const result = await axios_post(`/post/${postOriginId}`, sendData);

  if (result.isOkay) {
    // TODO: 성공 로직
    console.log(result.data);
    return true;
  } else {
    alert(result.message);
    return false;
  }
}
