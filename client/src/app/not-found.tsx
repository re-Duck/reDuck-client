import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-3">
      <h1 className="text-4xl font-semibold">404</h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-medium">Page not found :)</h2>
        <p className="text-base">
          페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
        </p>
      </div>

      <Link href="/">
        <button className="w-24 h-10 font-medium bg-yellow-300 rounded-md">
          홈으로
        </button>
      </Link>
    </div>
  );
}
