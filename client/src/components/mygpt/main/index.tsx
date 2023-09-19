import React, { forwardRef } from 'react';

type IProps = React.HTMLAttributes<HTMLDivElement>;

const GptMain = forwardRef<HTMLDivElement, IProps>(function GptMain(
  { children, ...props }: IProps,
  ref
) {
  return (
    <div
      ref={ref}
      className="flex flex-col max-w-2xl gap-6 pt-8 mx-auto min-h-[200px]"
      {...props}
    >
      {children}
    </div>
  );
});

export default GptMain;
