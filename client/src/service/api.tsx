import axios from "axios";

const BASE_URL = "http://168.188.123.234:8080";

// TODO: any 타입 정의하기
export async function axios_get(suburl: string, params: object) {
  try {
    const response = await axios.get(`${BASE_URL}${suburl}`, {
      params,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("AXIOS GET 통신 에러");
    }
  } catch (e: any) {
    alert(e.response.message);
  }
}

export async function axios_post(suburl: string, data: object) {
  try {
    const response = await axios.post(`${BASE_URL}${suburl}`, data);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("AXIOS POST 통신 에러");
    }
  } catch (e: any) {
    alert(e.response.message);
  }
}
