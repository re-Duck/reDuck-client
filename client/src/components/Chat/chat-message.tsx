import React from 'react';

interface IChatMessage {
  type: 'my' | 'other';
}

export default function ChatMessage({ type }: IChatMessage) {
  // TODO: 타입에 따라 메세지 스타일 정의
  return (
    <div>
      <span>채팅</span>
    </div>
  );
}
