import Image from 'next/image';
import React from 'react';
import ads from '@/assets/images/advertise.png';
export default function Advertisement() {
  return (
    <div className="hidden md:flex flex-col justify-center items-center bg-blue-5  bg-white w-3/12 h-60 border-gray-100 border-2">
      <Image src={ads} alt="Ads" width="60" height="60" />
      준비중...
    </div>
  );
}
