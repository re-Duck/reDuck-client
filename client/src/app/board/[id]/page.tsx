//core
import React, { Suspense } from 'react';

//components
import { Loading, PostContent } from '@/app/board/components';

//types
import { postManager } from '@/service/post';

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const initialData = await postManager.getPost({
    postOriginId: params.id,
  });
  return (
    <Suspense fallback={<Loading />}>
      <PostContent postOriginId={params.id} initialData={initialData} />
    </Suspense>
  );
}
