import Image from 'next/image';
import React from 'react';
export default function Advertisement() {
  return (
    <div className="flex-col items-center justify-center hidden bg-white border-2 border-gray-100 rounded-lg w-60 md:flex bg-blue-5 h-60">
      <Image src="/images/advertise.png" alt="Ads" width="60" height="60" />
      <p>준비중...</p>
    </div>
  );
}
