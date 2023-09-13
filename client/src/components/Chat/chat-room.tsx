// react, next
import React, { useEffect, useRef, useState } from 'react';

// components
import ChatMessage from '@/components/Chat/chat-message';

// types
import { IChatMessage } from '@/types';

interface IChatRoom {
  chatList: IChatMessage[];
  currentUid: string;
  handleSendMessage: (chatMessage: string) => void;
}

export default function ChatRoom({
  chatList,
  currentUid,
  handleSendMessage,
}: IChatRoom) {
  const [chatMessage, setChatMessage] = useState('');

  const messageRef = useRef<HTMLInputElement | null>(null);
  const chatRoomRef = useRef<HTMLDivElement | null>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  };

  const handleClickSend = () => {
    handleSendMessage(chatMessage);
    setChatMessage('');
  };

  useEffect(() => {
    if (chatRoomRef.current !== null) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <div
      className="relative flex-1 ml-4 border border-black h-5/6 overflow-y-scroll flex flex-col"
      ref={chatRoomRef}
    >
      <div className="flex flex-col-reverse">
        {chatList.map((val) => {
          const {
            messageId,
            message,
            userId: senderId,
            name,
            userProfileImgPath,
            messageTime,
          } = val;
          return (
            <ChatMessage
              key={messageId}
              type={senderId === currentUid ? 'my' : 'other'}
              message={message}
              name={name}
              userProfileImgPath={userProfileImgPath}
              messageTime={messageTime}
            />
          );
        })}
      </div>
      <div className="flex p-2.5  sticky bottom-0 bg-white">
        <input
          type="text"
          className="relative border border-black flex-1 p-1"
          value={chatMessage}
          ref={messageRef}
          onChange={handleMessageChange}
        />
        <button
          type="button"
          onClick={handleClickSend}
          className="rounded-md bg-indigo-600 p-2 ml-2 font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 w-20 text-sm sm:w-24 sm:text-base"
        >
          전송
        </button>
      </div>
    </div>
  );
}
