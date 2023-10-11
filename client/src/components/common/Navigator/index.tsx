import React from 'react';
import Link from 'next/link';
import { linkList } from '@/constants/constant';

// Icons
import { Icon } from '@iconify/react';

// session
import { useSession } from 'next-auth/react';

import Image from 'next/image';

interface INavigator {
  setisClickedHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  hasLoginButton: boolean;
}

export function Navigator({
  setisClickedHamburger,
  hasLoginButton,
}: INavigator) {
  const { data } = useSession();
  return (
    <nav
      className="fixed top-0 left-0 z-10 w-full bg-white border-b-2 border-gray-100 h-14"
      id="navigator"
    >
      <ul className="flex items-center justify-between h-full max-w-6xl p-8 m-auto">
        <li>
          <Link
            href="/"
            className="text-2xl font-bold"
            onClick={() => setisClickedHamburger(false)}
          >
            <div className="flex gap-1">
              reDuck
              <Image src="/main-duck.png" alt="reDuck" width={30} height={30} />
            </div>
          </Link>
        </li>
        {hasLoginButton && (
          <>
            <li className="flex-auto pl-8">
              <ul className="hidden gap-8 text-gray-500 sm:flex">
                {linkList.map(({ name, href }) => {
                  if (name === '로그인') return;
                  return (
                    <Link
                      href={href}
                      key={name}
                      className=" hover:cursor-pointer"
                    >
                      {name}
                    </Link>
                  );
                })}
              </ul>
            </li>

            <li>
              <ul>
                <li className="hidden font-bold sm:block">
                  {data ? (
                    <Link href={`/profile/${data.user.id}`}>마이페이지</Link>
                  ) : (
                    <Link href="/login">로그인</Link>
                  )}
                </li>
                <li className="sm:hidden">
                  {
                    <button
                      onClick={() => setisClickedHamburger((prev) => !prev)}
                    >
                      <Icon
                        icon="material-symbols:menu-rounded"
                        style={{ fontSize: '25px' }}
                      />
                    </button>
                  }
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
