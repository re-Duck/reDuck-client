//core
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

//constants
import { linkList } from '@/constants/constant';

// Icons
import { Icon } from '@iconify/react';
import reDuckIcon from '../../../../public/main-duck.png';

// session
import { useSession } from 'next-auth/react';
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
              <Image src={reDuckIcon} alt="reDuck" width={32} />
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
