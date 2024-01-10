import React from 'react';

export default function Follow({ targetUserId }: { targetUserId: string }) {
  return <div className="bg-white">{targetUserId}</div>;
}
