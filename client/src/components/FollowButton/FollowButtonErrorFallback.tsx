'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { openAlert } from '@/lib/redux/features/alert/alertSlice';

// components
import { Button } from '@/components';

// icon
import { Icon } from '@iconify/react';

// types
import type { FallbackProps } from 'react-error-boundary';

// constants
import { AlertType, errorMessage } from '@/constants/constant';

interface IProp extends FallbackProps {
  error: {
    code: string;
    status: number;
    message: string;
    timestamp: string;
  };
}

export default function FollowButtonErrorFallback({
  error,
  resetErrorBoundary,
}: IProp) {
  const dispatch = useDispatch();

  dispatch(
    openAlert({
      type: AlertType.ERROR,
      message: errorMessage.UnknownFollowCheck,
    })
  );

  return (
    <Button color="yellow_line" onClick={resetErrorBoundary}>
      <Icon
        icon="fluent-mdl2:people-repeat"
        fontSize={25}
        className="mx-auto"
      />
    </Button>
  );
}
