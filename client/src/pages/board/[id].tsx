import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <h2>상세페이지</h2>
      <p>Post: {id}</p>
    </Layout>
  );
}
