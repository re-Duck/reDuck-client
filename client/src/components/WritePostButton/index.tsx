import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import googleLogo from '@/assets/images/google_logo.png';

export function WritePostButton() {
  return (
    <article className="flex w-full  bg-white border-gray-100 border-2 h-20 p-6 hover:cursor-pointer">
      <Image src={googleLogo} alt="googleLogo" style={{ width: '25px' }} />
      <Link href={'/write'}>
        <button className="">나누고 싶은 생각이 있으신가요?</button>
      </Link>
    </article>
  );
}

export default React.memo(WritePostButton);
