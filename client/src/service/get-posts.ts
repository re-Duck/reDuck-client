import { axios_get } from './base/api';
import { IPostInformation } from '../types/index';

export const getAllPosts = async ({ pageParam = '' }) => {
  const params = {
    postOriginId: pageParam,
    postType: ['stack', 'qna'],
    page: 10,
  };
  const suburl = '/post';

  const response = await axios_get<IPostInformation[]>({ suburl, params });
  if (!response.isOkay) {
    throw new Error(response.error.status);
  }

  const data = response.data as IPostInformation[];
  const nextPageParms = data.at(-1)?.postOriginId;
  return { data, nextPageParms };
};
