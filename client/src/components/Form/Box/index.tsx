import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'row' | 'column';
}

function FormBox({ type = 'row', children }: IProps) {
  const style =
    type === 'row'
      ? 'relative flex grow shrink gap-x-2 items-baseline sm:gap-x-3'
      : 'flex flex-col grow gap-y-2';

  return <div className={style}>{children}</div>;
}

export default FormBox;
