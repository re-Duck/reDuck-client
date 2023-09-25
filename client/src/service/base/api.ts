import axios, { Axios, AxiosError } from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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
interface IAxiosPut {
  suburl: string;
  headers?: object;
  data: object;
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
export async function axios_get<Response = unknown>({
  suburl,
  headers = {},
  params = {},
}: IAxiosGet) {
  try {
    const response = await axios.get<Response>(`${BASE_URL}${suburl}`, {
      headers,
      params,
      paramsSerializer,
    });
    return {
      isOkay: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        isOkay: false,
        data: error.response?.data,
      };
    }
    return { error, isOkay: false };
  }
}

export async function axios_post({ suburl, data, headers = {} }: IAxiosPost) {
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
      data: e.response?.data,
      message: e.response?.message,
    };
  }
}

export async function axios_put({ suburl, data, headers = {} }: IAxiosPut) {
  try {
    const response = await axios.put(`${BASE_URL}${suburl}`, data, {
      headers,
    });
    const RESPONSE_OK = response.status === 200 || response.status === 201;

    if (RESPONSE_OK) {
      return {
        isOkay: true,
        data: response.data,
      };
    }
    throw new Error('AXIOS PUT 통신 에러');
  } catch (e: any) {
    return {
      isOkay: false,
      data: e.response?.data,
      message: e.response?.message,
    };
  }
}

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
