// react, next
import React, { useEffect, useRef, useState } from 'react';

// components
import ChatMessage from '@/components/Chat/chat-message';

// types
import { IChatMessage } from '@/types';

// utils
import { parseDate } from '@/util';

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
    <div className="relative flex-1 ml-4 border border-black h-5/6 flex flex-col">
      <div className="flex flex-col h-full overflow-y-scroll" ref={chatRoomRef}>
        {chatList.map((val, idx) => {
          const {
            messageId,
            message,
            userId: senderId,
            name,
            userProfileImgPath,
            messageTime,
          } = val;
          let dateDivider = null;
          if (idx !== 0) {
            dateDivider = parseDate(chatList[idx - 1].messageTime) !==
              parseDate(messageTime) && (
              <div className="px-3 py-2 bg-gray-300 w-fit mx-auto rounded-full text-sm">
                {parseDate(messageTime)}
              </div>
            );
          } else {
            dateDivider = (
              <div className="px-3 py-2 bg-gray-300 w-fit mx-auto rounded-full text-sm">
                {parseDate(messageTime)}
              </div>
            );
          }
          return (
            <>
              {dateDivider}
              <ChatMessage
                key={messageId}
                type={senderId === currentUid ? 'my' : 'other'}
                message={message}
                name={name}
                userProfileImgPath={userProfileImgPath}
                messageTime={messageTime}
              />
            </>
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
