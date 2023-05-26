import axios from 'axios';

export const BASE_URL = 'http://168.188.123.234:8080';

interface IResponse {
  isOkay: boolean;
  data: Array<object> | object;
  message?: string;
}
interface IAxiosGet {
  suburl: string;
  params?: object;
  headers?: object;
}
interface IAxiosPost {
  suburl: string;
  data: FormData | object;
  headers?: object;
}
interface IAxiosDelete {
  suburl: string;
  headers?: object;
}

const paramsSerializer = (paramObj: any) => {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    params.append(key, paramObj[key]);
  }

  return params.toString();
};

// TODO: any 타입 정의하기
export async function axios_get({
  suburl,
  headers = {},
  params = {},
}: IAxiosGet): Promise<IResponse> {
  try {
    const response = await axios.get(`${BASE_URL}${suburl}`, {
      params,
      headers,
      paramsSerializer,
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
      data: e.response?.data,
      message: e.response?.message,
    };
  }
}

export async function axios_post({
  suburl,
  data,
  headers = {},
}: IAxiosPost): Promise<IResponse> {
  try {
    const response = await axios.post(`${BASE_URL}${suburl}`, data, {
      headers,
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
export async function axios_delete({ suburl, headers = {} }: IAxiosDelete) {
  try {
    const response = await axios.delete(`${BASE_URL}${suburl}`, {
      headers,
    });
    const RESPONSE_OK = response.status === 204;

    if (RESPONSE_OK) {
      return {
        isOkay: true,
      };
    }
    throw new Error('AXIOS DELTE 통신 에러');
  } catch (e: any) {
    return {
      isOkay: false,
    };
  }
}
