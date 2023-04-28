import { QuillEditBox } from '@/components';
import Layout from '@/components/Layout';
import React from 'react';

export default function Write() {
  return (
    <Layout>
      <div>
        <QuillEditBox />
      </div>
    </Layout>
  );
}
