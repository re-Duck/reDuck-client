//core
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';

// hooks
import { useModal } from '@/hooks';

// constants
import { ModalType, errorMessage } from '@/constants/constant';

// types
import { IReduxState } from '@/types/redux/IReduxState';

// Icons
import { Icon } from '@iconify/react';

interface INavigator {
  setisClickedHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  hasLoginButton: boolean;
}

export function Navigator({
  setisClickedHamburger,
  hasLoginButton,
}: INavigator) {
  const user = useSelector((state: IReduxState) => state.auth);
  const { openModal } = useModal();
  return (
    <nav
      className="fixed top-0 left-0 z-10 w-full h-16 bg-white border-b-2 border-gray-100"
      id="navigator"
    >
      <ul className="flex items-center justify-between h-full max-w-5xl p-4 px-6 m-auto">
        <li>
          <Link
            href="/"
            className="text-2xl font-bold"
            onClick={() => setisClickedHamburger(false)}
          >
            <div className="flex gap-1">
              reDuck
              <Image
                src="/images/main-duck.png"
                alt="reDuck"
                width={32}
                height={32}
              />
            </div>
          </Link>
        </li>
        {hasLoginButton && (
          <>
            <li className="flex-auto pl-8">
              <ul className="hidden gap-8 text-gray-500 sm:flex">
                {user.userId ? (
                  <Link href={'/chat'} className="hover:cursor-pointer">
                    채팅방
                  </Link>
                ) : (
                  <li
                    className="hover:cursor-pointer"
                    onClick={() =>
                      openModal({
                        type: ModalType.ERROR,
                        message: errorMessage.needLogin,
                      })
                    }
                  >
                    채팅방
                  </li>
                )}
                <Link href={'/mygpt'} className="hover:cursor-pointer">
                  GPT
                </Link>
              </ul>
            </li>

            <li>
              <ul>
                <li className="hidden font-bold sm:block">
                  {user.userId ? (
                    <Link href={`/profile/${user.userId}`}>마이페이지</Link>
                  ) : (
                    <Link href="/login">로그인</Link>
                  )}
                </li>
                <li className="sm:hidden">
                  <Icon
                    icon="material-symbols:menu-rounded"
                    style={{ fontSize: '25px' }}
                    className="cursor-pointer"
                    onClick={() => setisClickedHamburger((prev) => !prev)}
                  />
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default React.memo(Navigator);
