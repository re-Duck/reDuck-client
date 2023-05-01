import axios from 'axios';

const BASE_URL = 'http://168.188.123.234:8080';

interface IResponse {
  isOkay: boolean;
  data: object;
  message?: string;
}

// TODO: any 타입 정의하기
export async function axios_get(
  suburl: string,
  params: object
): Promise<IResponse> {
  try {
    const response = await axios.get(`${BASE_URL}${suburl}`, {
      params,
    });
    const RESPONSE_OK = response.status === 200 || response.status === 201;
    if (RESPONSE_OK) {
      return {
        isOkay: true,
        data: response.data,
      };
    }
    throw new Error('AXIOS GET 통신 에러');
  } catch (e: any) {
    return {
      isOkay: false,
      data: e.response.data,
      message: e.response.message,
    };
  }
}

export async function axios_post(
  suburl: string,
  data: FormData
): Promise<IResponse> {
  try {
    const response = await axios.post(`${BASE_URL}${suburl}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
    });
    const RESPONSE_OK = response.status === 200 || response.status === 201;
    if (RESPONSE_OK) {
      return {
        isOkay: true,
        data: response.data,
      };
    }
    throw new Error('AXIOS POST 통신 에러');
  } catch (e: any) {
    return {
      isOkay: false,
      data: e.response.data,
      message: e.response.message,
    };
  }
}

// TODO: axios_put, axios_delete 구현
