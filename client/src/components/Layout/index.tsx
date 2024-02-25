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
      <main className="h-full pt-[120px] max-w-[1024px] m-auto px-4">
        {children}
      </main>
    </main>
  );
}
