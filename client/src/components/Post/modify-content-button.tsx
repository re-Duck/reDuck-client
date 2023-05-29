import React from 'react';

import { useRouter } from 'next/router';

export default function ModifyCotentButton({ postOriginId }: any) {
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
