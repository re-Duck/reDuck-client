import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
//components
import { Layout } from '@/components';
import { IPostInformation } from '../../types/index';
import { Loading } from '@/components/board';
import ErrorFallback from '@/components/common/ErrorFallback';
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
    <Layout>
      <ErrorBoundary
        FallbackComponent={(props) => (
          <ErrorFallback {...props} hasHomeButton={true} />
        )}
      >
        <Suspense fallback={<Loading />}>
          <PostContent postOriginId={pageProps.postOriginId} />
        </Suspense>
      </ErrorBoundary>
    </Layout>
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
