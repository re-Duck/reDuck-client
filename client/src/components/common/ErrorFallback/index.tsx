import React from 'react';
import { errorMessage } from '@/constants/constant';

function ErrorFallback() {
  return (
    <div className="flex flex-col items-center gap-2 pt-4">
      <h1 className="text-2xl font-semibold">{errorMessage.networkError}</h1>
      <p>{errorMessage.tryAgarin}</p>
    </div>
  );
}

export default ErrorFallback;
