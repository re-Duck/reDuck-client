import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = BASE_URL;

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

export async function axios_get<Response extends { data: any }>({
  suburl,
  headers = {},
  params = {},
}: Omit<AxiosProps<unknown>, 'data'>) {
  try {
    const response = await axios.get<Response>(suburl, {
      headers,
      params,
      paramsSerializer,
    });
    //TODO: data: response.data.data로 바꾸기 (백엔드 변경 이후)
    return {
      isOkay: true,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        isOkay: false,
        error: error.response?.data,
      };
    }
    return {
      error,
      isOkay: false,
    };
  }
}

export async function axios_post<
  Response extends { data: any },
  Request = unknown
>({ suburl, data, headers = {} }: AxiosProps<Request>) {
  try {
    const response = await axios.post<Response>(suburl, data, {
      headers,
    });
    return {
      isOkay: true,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        isOkay: false,
        error: error.response?.data,
      };
    }
    return {
      error,
      isOkay: false,
    };
  }
}

export async function axios_put<
  Response extends { data: any },
  Request = unknown
>({ suburl, data, headers = {} }: AxiosProps<Request>) {
  try {
    const response = await axios.put<Response>(suburl, data, {
      headers,
    });
    return {
      isOkay: true,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        isOkay: false,
        error: error.response?.data,
      };
    }
    return {
      error,
      isOkay: false,
    };
  }
}

export async function axios_delete<Response extends { data: any }>({
  suburl,
  headers = {},
}: Omit<AxiosProps<unknown>, 'data'>) {
  try {
    const response = await axios.delete<Response>(suburl, {
      headers,
    });
    return {
      isOkay: true,
      data: response.data.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        isOkay: false,
        error: error.response?.data,
      };
    }
    return {
      error,
      isOkay: false,
    };
  }
}
