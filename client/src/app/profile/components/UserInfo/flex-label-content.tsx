import React from 'react';
import { IFlexLabelContent } from '@/types';

export default function FlexLabelContent({
  label,
  content,
}: IFlexLabelContent) {
  return (
    <div className="flex items-center">
      <label className="w-24 min-w-fit">{label}</label>
      {content}
    </div>
  );
}
