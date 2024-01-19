import React from 'react';

export default function DateDivider({ messageTime }: { messageTime: string }) {
  return (
    <div className="px-3 py-2 bg-gray-300 w-fit mx-auto rounded-full text-sm">
      {messageTime}
    </div>
  );
}
