import { axios_get } from '../base/api';
import { IPostInformation } from '../../types/index';

async function getAllPosts({
  pageParam = '',
  postType,
}: {
  pageParam: string;
  postType: 'stack' | 'qna';
}) {
  const params = {
    postOriginId: pageParam,
    postType: [postType],
    page: 10,
  };
  const suburl = '/post';

  const response = await axios_get<IPostInformation[]>({ suburl, params });
  if (!response.isOkay) {
    throw new Error(response.error);
  }

  const data = response.data as IPostInformation[];
  const nextPageParms = data.at(-1)?.postOriginId;

  return { data, nextPageParms };
}

export default getAllPosts;
