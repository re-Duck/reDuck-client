import React from 'react';

import { useRouter } from 'next/router';

interface IProps {
  postOriginId: string;
}
export default function ModifyCotentButton({ postOriginId }: IProps) {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push({
          pathname: '/write',
          query: { postOriginId },
        })
      }
    >
      수정
    </button>
  );
}
