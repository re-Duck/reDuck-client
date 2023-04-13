import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { PostDetail } from '@/components';

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <PostDetail id={id} />
    </Layout>
  );
}
