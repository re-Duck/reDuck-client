import React from 'react';
import { Icon } from '../assets/icon';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type: keyof typeof Icon;
}

function ToolbarIcon({ type }: Props) {
  const IconImage = Icon[type];

  return (
    <button
      onClick={() => {
        console.log();
      }}
      className="opacity-70 hover:opacity-40 "
    >
      <IconImage />
    </button>
  );
}

export default ToolbarIcon;
