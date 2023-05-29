import React from 'react';
import Link from 'next/link';
import { linkList } from '@/constant';

// Icons
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';

interface INavigator {
  setisClickedHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navigator({ setisClickedHamburger }: INavigator) {
  const authState = useSelector((state: any) => state.auth);
  return (
    <nav className="w-full h-14 border-b-2 border-gray-100 fixed top-0 left-0 bg-white z-10">
      <ul className="m-auto p-8 max-w-6xl flex justify-between items-center h-full">
        <li>
          <Link href="/" className="text-2xl font-bold">
            reDuck🐥
          </Link>
        </li>

        <li className="flex-auto pl-8">
          <ul className="hidden sm:flex gap-8 text-gray-500">
            {linkList.map(({ name, href }) => (
              <li key={name}>
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <ul>
            <li className="hidden sm:block font-bold">
              {authState.isLogin ? (
                <Link href={`/profile/${authState.userId}`}>마이페이지</Link>
              ) : (
                <Link href="/login">로그인</Link>
              )}
            </li>
            <li className="sm:hidden">
              {
                <button onClick={() => setisClickedHamburger((prev) => !prev)}>
                  <Icon
                    icon="material-symbols:menu-rounded"
                    style={{ fontSize: '25px' }}
                  />
                </button>
              }
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default React.memo(Navigator);
