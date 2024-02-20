import { Layout } from '@/components';

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <div className="pt-[38px] flex justify-center">{children}</div>
    </Layout>
  );
}
