import React from 'react';

import { useRouter } from 'next/navigation';

interface IProps {
  postOriginId: string;
}
export default function ModifyCotentButton({ postOriginId }: IProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/write/${postOriginId}`)}
      className="font-normal text-gray-400"
    >
      수정
    </button>
  );
}
