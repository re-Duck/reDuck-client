import { linkList } from '@/constant';
import Link from 'next/link';
import React from 'react';

import { useSelector } from 'react-redux';

interface IMenuView {
  isClickedHamburger: boolean;
}

export default function MenuView({ isClickedHamburger }: IMenuView) {
  const authState = useSelector((state: any) => state.auth);
  return (
    <>
      {isClickedHamburger && (
        <div className="fixed top-14 z-10 w-screen h-screen sm:hidden bg-white">
          <ul className="flex flex-col text-2xl">
            {linkList.map(({ name, href }) => (
              <li
                className="flex justify-center items-center h-16 border-b-2 border-gray-100 text-gray-500"
                key={name}
              >
                <Link href={href}>{name}</Link>
              </li>
            ))}
            <li className="flex justify-center items-center h-16 border-b-2 border-gray-100 text-gray-500">
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
