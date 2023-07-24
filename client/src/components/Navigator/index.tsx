import React from 'react';
import Link from 'next/link';
import { linkList } from '@/constant';

// Icons
import { Icon } from '@iconify/react';

// session
import { useSession } from 'next-auth/react';

import Image from 'next/image';

interface INavigator {
  setisClickedHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  viewList: boolean;
}

export function Navigator({ setisClickedHamburger, viewList }: INavigator) {
  const { data } = useSession();
  return (
    <nav
      className="w-full h-14 border-b-2 border-gray-100 fixed top-0 left-0 bg-white z-10"
      id="navigator"
    >
      <ul className="m-auto p-8 max-w-6xl flex justify-between items-center h-full">
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
        {viewList && (
          <>
            <li className="flex-auto pl-8">
              <ul className="hidden sm:flex gap-8 text-gray-500">
                {linkList.map(({ name, href }) => (
                  <li key={name} className=" hover:cursor-pointer">
                    <Link href={href}>{name}</Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <ul>
                <li className="hidden sm:block font-bold">
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
