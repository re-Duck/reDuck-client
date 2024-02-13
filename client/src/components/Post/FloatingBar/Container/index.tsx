import React from 'react';

export default function FloatingBarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute top-0 h-full -left-24">
      <div className="sticky z-10 w-12 shadow-md top-36 -left-24">
        {children}
      </div>
    </div>
  );
}
