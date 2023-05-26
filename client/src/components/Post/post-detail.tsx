import React, { useEffect, useState } from 'react';

//interface
import { IPostInformation } from '@/types';
import { parseDate } from '@/util';
import Image from 'next/image';
import { BASE_URL } from '@/service/base/api';
import user_icon from '@/assets/images/user_icon.png';
import { useModal } from '@/hooks';
import { ModalType, successMessage, warningMessage } from '@/constant';
import { deletePost } from '@/service/delete-post';
import { useRouter } from 'next/router';

interface PostDetail {
  data: IPostInformation;
  IS_AUTHOR: boolean;
  token: string;
}

export default function PostDetail({ data, IS_AUTHOR, token }: PostDetail) {
  const [html, setHTML] = useState<string>('');
  const url = data ? `${BASE_URL}${data.postAuthorProfileImgPath}` : user_icon;
  const { openModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    setHTML(data?.postContent);
  }, []);
  return (
    <article className="flex flex-col min-w-full max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-4">
      <h1 className="text-xl font-bold">{data.postTitle}</h1>
      <h2 className="text-md font-semibold"></h2>
      <div className="flex justify-between mb-5">
        <div className="flex gap-2 font-semibold">
          <Image
            src={url}
            alt="user_icon"
            width="0"
            height="0"
            className="rounded-full w-6 h-6"
          />
          <p>{data.postAuthorName}</p>
        </div>
        {IS_AUTHOR && (
          <div className="flex gap-1 font-normal text-gray-500">
            <button>수정</button>
            <button
              onClick={() =>
                openModal({
                  type: ModalType.WARNING,
                  message: warningMessage.confirmDeletePost,
                  callback: () =>
                    deletePost({
                      postOriginId: data.postOriginId,
                      token,
                      callback: () => {
                        router.push('/');
                        openModal({
                          type: ModalType.SUCCESS,
                          message: successMessage.postDeleteSuccess,
                        });
                      },
                    }),
                })
              }
            >
              삭제
            </button>
          </div>
        )}
      </div>
      <p
        className="text-md text-gray-500"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <p className="text-gray-400">{parseDate(data?.postCreatedAt)}</p>
      <hr />
      <p className="text-gray-400 text-sm">좋아요 0 | 조회 0</p>
    </article>
  );
}
