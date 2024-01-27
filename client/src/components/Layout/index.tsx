import Navigator from '../Navigator';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <main className="w-full h-full">
      <Navigator />
      <main className="min-h-screen pt-20 m-auto bg-gray-50">{children}</main>
    </main>
  );
}
