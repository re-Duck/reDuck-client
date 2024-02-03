import { Layout } from '@/components';

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout viewMode="qna">
      <div className="mt-[38px]">{children}</div>
    </Layout>
  );
}
