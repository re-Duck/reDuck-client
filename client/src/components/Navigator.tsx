import React from 'react';
import Link from 'next/link';
import { linkList } from '@/constant';

interface INavigator {
  setisClickedHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navigator({ setisClickedHamburger }: INavigator) {
  return (
    <>
      <nav className="w-full h-14 border-b-2 border-gray-100">
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
                <button
                  className="material-symbols-outlined hover:cursor-pointer"
                  onClick={() => setisClickedHamburger(prev => !prev)}
                >
                  Menu
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}
