//core
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
//components
import { Layout } from '@/components';
import { Loading } from '@/components/board';
import ErrorFallback from '@/components/common/ErrorFallback';
//types
import { IPostInformation } from '@/types';
//third party
import { ErrorBoundary } from 'react-error-boundary';

const PostContent = dynamic(
  () => import('@/components/board/PostContent/index'),
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
      <Layout>
        <Suspense fallback={<Loading />}>
          <PostContent postOriginId={pageProps.postOriginId} />
        </Suspense>
      </Layout>
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
