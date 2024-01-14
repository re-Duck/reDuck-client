'use client';
// react, next
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

// components
import { Avatar } from '@/components';

// hooks
import { useModal } from '@/hooks';

// service
import { BASE_URL } from '@/service/base/api';

// constant
import { ModalType, errorMessage } from '@/constants/constant';

// types
import { IReduxState } from '@/types/redux/IReduxState';

export function WritePostButton() {
  const user = useSelector((state: IReduxState) => state.auth);
  const imgPath = user.userProfileImgPath
    ? `${BASE_URL}${user.userProfileImgPath}`
    : '';
  const { openModal } = useModal();

  return (
    <article className="flex justify-center w-full items-center bg-white border-gray-100 border-[1px] h-25 p-6 gap-4">
      <Avatar src={imgPath} alt="profileImg" size="sm" />
      {user.userId ? (
        <Link href={'/write'} className="w-10/12">
          <button className=" border-[1px] rounded-md w-full bg-gray-50 h-11">
            <p className="text-gray-400 ">나누고 싶은 생각이 있으신가요?</p>
          </button>
        </Link>
      ) : (
        <button
          className=" border-[1px] rounded-md w-10/12 bg-gray-50 h-11"
          onClick={() =>
            openModal({
              type: ModalType.ERROR,
              message: errorMessage.needLogin,
            })
          }
        >
          <p className="text-gray-400 ">로그인 후 게시글을 작성해 주세요</p>
        </button>
      )}
    </article>
  );
}

export default React.memo(WritePostButton);
