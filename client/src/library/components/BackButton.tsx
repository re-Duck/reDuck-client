import React from 'react';
import { Icon } from '@iconify/react';

function BackButton() {
  return (
    <button type="button">
      <Icon
        icon="material-symbols:arrow-back-rounded"
        style={{ fontSize: '30px' }}
      />
    </button>
  );
}

export default BackButton;
