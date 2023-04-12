import { menuViewLinkList } from '@/constant';
import Link from 'next/link';
import React from 'react';

interface IMenuView {
  isClickedHamburger: boolean;
}

export default function MenuView({ isClickedHamburger }: IMenuView) {
  return (
    <>
      {isClickedHamburger && (
        <div className="fixed top-14 z-10 w-screen h-screen sm:hidden bg-white">
          <ul className="flex flex-col text-2xl">
            {menuViewLinkList.map(({ name, href }) => (
              <li
                className="flex justify-center items-center h-16 border-b-2 border-gray-100 text-gray-500"
                key={name}
              >
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
