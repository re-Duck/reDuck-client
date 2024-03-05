'use client';

import ErrorFallback from '@/components/ErrorFallback';

export default function Error({ error }: { error: Error }) {
  return <ErrorFallback error={error} hasHomeButton={true} />;
}
