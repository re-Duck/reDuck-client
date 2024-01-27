import { PostViewType } from '@/types';
import Navigator from '../Navigator';

interface IProps {
  children: React.ReactNode;
  viewMode?: PostViewType;
}

export default function Layout({ children, viewMode }: IProps) {
  return (
    <main className="w-full h-full">
      <Navigator viewMode={viewMode} />
      <main className="min-h-screen pt-20 m-auto bg-gray-50">{children}</main>
    </main>
  );
}
