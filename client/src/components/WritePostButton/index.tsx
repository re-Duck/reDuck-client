import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import googleLogo from '@/assets/images/google_logo.png';

export function WritePostButton() {
  return (
    <article className="flex justify-between w-full items-center bg-white border-gray-100 border-[1px] h-25 p-6 ">
      <Image
        src={googleLogo}
        alt="googleLogo"
        style={{ width: '35px', height: '35px' }}
      />
      <button className=" border-[1px] rounded-md w-11/12 bg-gray-50 h-12">
        <Link href={'/write'}>
          <p className=" text-gray-400">나누고 싶은 생각이 있으신가요?</p>
        </Link>
      </button>
    </article>
  );
}

export default React.memo(WritePostButton);
