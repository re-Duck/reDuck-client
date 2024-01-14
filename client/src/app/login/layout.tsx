import React from 'react';
import { Layout } from '@/components';

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout hasLoginButton={false}>{children}</Layout>;
}
