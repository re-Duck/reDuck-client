// react, next
import React, { useEffect, useRef, useState } from 'react';

// react-query
import { useInfiniteQuery } from '@tanstack/react-query';

// components
import ChatMessage from '@/components/Chat/chat-message';

// types
import { IChatMessage } from '@/types';

// utils
import { parseDate } from '@/util';

// services
import { getRoomChat } from '@/service/chat-get';

// constant
import { SCROLL_STATE_CHANGE_INTERVAL, SCROLL_TOP_BOUNDARY } from '@/constant';

interface IChatRoom {
  token: string;
  roomId: string;
  chatList: IChatMessage[];
  currentUid: string;
  setChatList: React.Dispatch<React.SetStateAction<IChatMessage[]>>;
  handleSendMessage: (chatMessage: string) => void;
}

export default function ChatRoom({
  token,
  roomId,
  chatList,
  currentUid,
  setChatList,
  handleSendMessage,
}: IChatRoom) {
  const [chatMessage, setChatMessage] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);

  const messageRef = useRef<HTMLInputElement | null>(null);
  const chatRoomRef = useRef<HTMLDivElement | null>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClickSend();
    }
  };

  const handleClickSend = () => {
    if (chatMessage !== '') {
      handleSendMessage(chatMessage);
      setChatMessage('');
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['chat'],
    queryFn: ({ pageParam }) =>
      getRoomChat({ roomId, token, messageId: pageParam }),
    getNextPageParam: (lastPage) => lastPage?.nextPageParam,
  });

  useEffect(() => {
    if (chatRoomRef.current !== null) {
      if (!isScrolling) {
        chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
      }
    }
  }, [chatList]);

  useEffect(() => {
    if (data !== undefined) {
      const newData = data?.pages[data?.pages.length - 1].chatMessages;
      newData.reverse();
      setChatList((chat) => [...newData, ...chat]);
    }
  }, [data]);

  useEffect(() => {
    setChatList([]);
    fetchNextPage({ pageParam: 0 });
  }, [roomId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleScroll = async (e: Event) => {
      setIsScrolling(true);

      const chatRoomElement = e.currentTarget;

      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, SCROLL_STATE_CHANGE_INTERVAL);

      if (chatRoomElement) {
        const { scrollTop } = chatRoomElement as Element;
        if (!isFetching && hasNextPage && scrollTop <= SCROLL_TOP_BOUNDARY) {
          await fetchNextPage();
        }
      }
    };

    if (chatRoomRef.current) {
      chatRoomRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatRoomRef.current) {
        chatRoomRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isFetching, hasNextPage]);

  return (
    <div className="relative flex-1 ml-4 border border-black h-5/6 flex flex-col">
      <div className="flex flex-col h-full overflow-y-scroll" ref={chatRoomRef}>
        {chatList?.map((val, idx) => {
          const {
            messageId,
            message,
            userId: senderId,
            name,
            userProfileImgPath,
            messageTime,
          } = val;

          const dateDivider =
            idx === 0 ||
            (idx !== 0 &&
              parseDate(chatList[idx - 1].messageTime) !==
                parseDate(messageTime)) ? (
              <div className="px-3 py-2 bg-gray-300 w-fit mx-auto rounded-full text-sm">
                {parseDate(messageTime)}
              </div>
            ) : null;

          return (
            <React.Fragment key={messageId}>
              {dateDivider}
              <ChatMessage
                type={senderId === currentUid ? 'my' : 'other'}
                message={message}
                name={name}
                userProfileImgPath={userProfileImgPath}
                messageTime={messageTime}
              />
            </React.Fragment>
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
          onKeyDown={handleKeyDown}
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
