import { Layout } from '@/components';

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout viewMode="qna">
      <div className="">{children}</div>
    </Layout>
  );
}
