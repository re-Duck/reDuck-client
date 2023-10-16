/* eslint-disable @typescript-eslint/no-explicit-any */
import { linkList } from '@/constants/constant';
import Link from 'next/link';
import React from 'react';

import { useSelector } from 'react-redux';

interface IMenuView {
  isClickedHamburger: boolean;
  hasLoginButton: boolean;
  setisClickedHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuView({
  isClickedHamburger,
  hasLoginButton,
  setisClickedHamburger,
}: IMenuView) {
  const authState = useSelector((state: any) => state.auth);
  const linkStyle =
    'flex items-center justify-center h-16 text-gray-500 border-b-2 border-gray-100 cursor-pointer hover:bg-slate-100';

  return (
    <>
      {isClickedHamburger && hasLoginButton && (
        <div className="fixed z-10 w-screen h-screen bg-white top-14 sm:hidden">
          <ul className="flex flex-col text-2xl">
            {linkList.map(({ name, href }) => {
              if (name === '로그인' && authState.isLogin) {
                return (
                  <Link
                    className={linkStyle}
                    key={name}
                    href={`/profile/${authState.userId}`}
                    onClick={() => setisClickedHamburger(false)}
                  >
                    마이페이지
                  </Link>
                );
              }
              return (
                <Link
                  className={linkStyle}
                  key={name}
                  href={href}
                  onClick={() => setisClickedHamburger(false)}
                >
                  {name}
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
