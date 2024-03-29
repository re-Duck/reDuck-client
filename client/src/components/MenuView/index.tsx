// react, next
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

// hooks
import useModal from '@/hooks/modal/useModal';
// constant
import { linkList, ModalType, errorMessage } from '@/constants/constant';

// types
import { IReduxState } from '@/types/redux/IReduxState';

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
  const authState = useSelector((state: IReduxState) => state.auth);
  const { openModal } = useModal();
  const linkStyle =
    'flex items-center justify-center h-16 text-gray-500 border-b-2 border-gray-100 cursor-pointer hover:bg-slate-100';

  return (
    <>
      {isClickedHamburger && hasLoginButton && (
        <div className="fixed z-10 w-screen h-screen bg-white top-14 sm:hidden">
          <ul className="flex flex-col text-2xl">
            {linkList.map(({ name, href }) => {
              if (name === '로그인' && authState.userId) {
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
              } else if (name === '채팅방') {
                return authState.userId ? (
                  <Link
                    className={linkStyle}
                    key={name}
                    href={href}
                    onClick={() => setisClickedHamburger(false)}
                  >
                    {name}
                  </Link>
                ) : (
                  <li
                    className={linkStyle}
                    key={name}
                    onClick={() =>
                      openModal({
                        type: ModalType.ERROR,
                        message: errorMessage.needLogin,
                      })
                    }
                  >
                    {name}
                  </li>
                );
              } else {
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
              }
            })}
          </ul>
        </div>
      )}
    </>
  );
}
