import Link from 'next/link';

import { errorMessage } from '@/constants/constant';
import NotFound from '@/app/not-found';

interface ErrorFallbackProps {
  hasHomeButton?: boolean;
  error: Error;
}

function ErrorFallback({ hasHomeButton = false, error }: ErrorFallbackProps) {
  if (error.message === 'POST_NOT_EXIST') {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2 pt-4">
      <h1 className="text-2xl font-semibold">{errorMessage.networkError}</h1>
      <p>{errorMessage.tryAgain}</p>
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
