// service
import { axios_post } from "./base/api";

export async function loginPost(sendData: object): Promise<boolean> {
  const result = await axios_post("/login", sendData);
  if (result.isOkay) {
    // TODO: 성공 로직
    console.log(result.data);
    return true;
  } else {
    alert(result.message);
    return false;
  }
}
