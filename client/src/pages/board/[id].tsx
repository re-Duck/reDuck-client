import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
//components
import { Layout } from '@/components';
import { IPostInformation } from '../../types/index';
import { Loading } from '@/components/board';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ErrorFallback from '@/components/common/ErrorFallback';

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
      <ErrorBoundary fallback={<ErrorFallback />}>
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
