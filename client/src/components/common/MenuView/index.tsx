import { ModalType, errorMessage, linkList } from '@/constants/constant';
import { useModal } from '@/hooks';
import Link from 'next/link';
import React from 'react';

import { useSelector } from 'react-redux';

interface IMenuView {
  isClickedHamburger: boolean;
  viewList: boolean;
}

export default function MenuView({ isClickedHamburger, viewList }: IMenuView) {
  const authState = useSelector((state: any) => state.auth);
  const { openModal } = useModal();
  return (
    <>
      {isClickedHamburger && viewList && (
        <div className="fixed z-10 w-screen h-screen bg-white top-16 sm:hidden">
          <ul className="flex flex-col text-2xl">
            {linkList.map(({ name, href }) => (
              <li
                className="flex items-center justify-center h-16 text-gray-500 border-b-2 border-gray-100 cursor-pointer hover:bg-slate-100"
                key={name}
                onClick={() =>
                  openModal({
                    type: ModalType.ERROR,
                    message: errorMessage.notComplete,
                  })
                }
              >
                {name}
                {/* <Link href={href}>{name}</Link> */}
              </li>
            ))}
            <li className="flex items-center justify-center h-16 text-gray-500 border-b-2 border-gray-100 hover:bg-slate-100">
              {authState.isLogin ? (
                <Link href={`/profile/${authState.userId}`}>마이페이지</Link>
              ) : (
                <Link href="/login">로그인</Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
