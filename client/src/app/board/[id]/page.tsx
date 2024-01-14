//core
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
//components
import { Layout } from '@/components';
import { Loading } from '@/app/board/components';
import ErrorFallback from '../../../components/ErrorFallback';
//types
import { IPostInformation } from '@/types';
//third party
import { ErrorBoundary } from 'react-error-boundary';

const PostContent = dynamic(
  () => import('@/app/board/components/PostContent/index'),
  {
    ssr: false,
  }
);
interface IProps {
  pageProps: {
    suburl: string;
    postOriginId: string;
    data: IPostInformation;
  };
}
export default function PostDetailPage({ pageProps }: IProps) {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => (
        <ErrorFallback {...props} hasHomeButton={true} />
      )}
    >
      <Suspense fallback={<Loading />}>
        <PostContent postOriginId={pageProps.postOriginId} />
      </Suspense>
    </ErrorBoundary>
  );
}
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const postOriginId = params.id;
  return { props: { postOriginId } };
}
