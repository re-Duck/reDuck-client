import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface AxiosProps<T> {
  suburl: string;
  data: T;
  params?: Record<string, unknown>;
  headers?: object;
}

const paramsSerializer = (paramObj: Record<string, string>) => {
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
}: Omit<AxiosProps<unknown>, 'data'>) {
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
  }
}

export async function axios_post<Response = unknown, Request = unknown>({
  suburl,
  data,
  headers = {},
}: AxiosProps<Request>) {
  try {
    const response = await axios.post<Response>(`${BASE_URL}${suburl}`, data, {
      headers,
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
  }
}

export async function axios_put<Response = unknown, Request = unknown>({
  suburl,
  data,
  headers = {},
}: AxiosProps<Request>) {
  try {
    const response = await axios.put<Response>(`${BASE_URL}${suburl}`, data, {
      headers,
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
  }
}

export async function axios_delete<Response = unknown>({
  suburl,
  headers = {},
}: Omit<AxiosProps<unknown>, 'data'>) {
  try {
    const response = await axios.delete<Response>(`${BASE_URL}${suburl}`, {
      headers,
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
  }
}
