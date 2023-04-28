import React from 'react';
import Link from 'next/link';
import { linkList } from '@/constant';

// Images & Icons
import menu_icon from '@/assets/images/hamburger_logo.svg';
import Image from 'next/image';

interface INavigator {
  setisClickedHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navigator({ setisClickedHamburger }: INavigator) {
  return (
    <nav className="w-full h-14 border-b-2 border-gray-100 fixed top-0 left-0 bg-white">
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
              <Link href="/login">로그인</Link>
            </li>
            <li className="sm:hidden">
              {
                <button onClick={() => setisClickedHamburger((prev) => !prev)}>
                  <Image
                    src={menu_icon}
                    alt="menu_icon"
                    style={{ width: '25px' }}
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
