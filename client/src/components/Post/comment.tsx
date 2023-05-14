import Image from 'next/image';
import React from 'react';

import googleLogo from '../../assets/images/google_logo.png';

export default function Comment() {
  return (
    <div className="flex flex-col w-full max-w-4xl m-auto bg-white border-gray-100 border-2 p-6 gap-7">
      <div className="flex gap-4">
        <Image src={googleLogo} alt="googleLogo" style={{ width: '20px' }} />
        <span className=" font-semibold">배성현</span>
      </div>
      <p className="text-md text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias saepe
        odit eos laborum culpa, animi sapiente! Voluptas est rem ipsum ex.
        Aspernatur ab voluptatem saepe deleniti incidunt pariatur, modi iusto!
      </p>
    </div>
  );
}
