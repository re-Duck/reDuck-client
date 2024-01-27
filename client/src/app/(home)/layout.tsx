import { Layout } from '@/components';

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout viewMode="community">
      <div className="flex justify-between max-w-5xl mx-auto">{children}</div>
    </Layout>
  );
}
