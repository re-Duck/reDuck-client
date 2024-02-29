import { PropsWithChildren } from 'react';

export default function LayoutComponent({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen">
      <div className="m-auto max-w-[1056px] h-full">{children}</div>
    </div>
  );
}
