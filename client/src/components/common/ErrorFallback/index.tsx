import React from 'react';
import Link from 'next/link';
import { FallbackProps } from 'react-error-boundary';

import { errorMessage } from '@/constants/constant';
import { useRouter } from 'next/router';
interface ErrorFallbackProps extends FallbackProps {
  hasHomeButton?: boolean;
}

function ErrorFallback({ hasHomeButton, ...props }: ErrorFallbackProps) {
  const router = useRouter();
  if (props.error.message === 'POST_NOT_EXIST') {
    router.push('/');
    return <></>;
  }

  return (
    <div className="flex flex-col items-center gap-2 pt-4">
      <h1 className="text-2xl font-semibold">{errorMessage.networkError}</h1>
      <p>{errorMessage.tryAgarin}</p>
      {hasHomeButton && (
        <Link href="/">
          <button className="w-24 h-10 font-medium bg-yellow-300 rounded-md">
            홈으로
          </button>
        </Link>
      )}
    </div>
  );
}

export default ErrorFallback;
