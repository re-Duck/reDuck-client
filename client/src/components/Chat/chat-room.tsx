// react, next
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// react-query
import { useInfiniteQuery } from '@tanstack/react-query';

// components
import ChatMessage from '@/components/Chat/chat-message';
import DateDivider from '@/components/Chat/date-divider';
import { Icon } from '@iconify/react';

// types
import { IChatMessage, IChatRoomInfo } from '@/types';
import { IReduxState } from '@/types/redux/IReduxState';

// utils
import { parseDate } from '@/util';

// services
import { getRoomChat } from '@/service/chat-get';

// constant
import {
  SCROLL_STATE_CHANGE_INTERVAL,
  SCROLL_TOP_BOUNDARY,
} from '@/constants/constant';

interface IChatRoom {
  roomInfo: IChatRoomInfo;
  chatList: IChatMessage[];
  setChatList: React.Dispatch<React.SetStateAction<IChatMessage[]>>;
  handleSendMessage: (chatMessage: string) => void;
  handleDisconnect: () => void;
}

export default function ChatRoom({
  roomInfo,
  chatList,
  setChatList,
  handleSendMessage,
  handleDisconnect,
}: IChatRoom) {
  const user = useSelector((state: IReduxState) => state.auth);

  const { roomId, roomName } = roomInfo;

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
    if (chatMessage.length !== 0) {
      handleSendMessage(chatMessage);
      setChatMessage('');
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['chat', roomId],
    queryFn: ({ pageParam }) => getRoomChat({ roomId, messageId: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
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
      const newData = data?.pages.at(-1)?.chatMessages as IChatMessage[];
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
      chatRoomRef.current.addEventListener('scroll', handleScroll, {
        passive: true,
      });
    }

    return () => {
      if (chatRoomRef.current) {
        chatRoomRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isFetching, hasNextPage]);

  return (
    <div className="absolute z-10 bg-white h-full w-full sm:relative">
      <div className="relative flex flex-col h-full flex-1 border border-black sm:ml-4">
        <div className="p-2 text-center shadow-md mb-1">
          <Icon
            icon="eva:arrow-ios-back-outline"
            fontSize={28}
            color="black"
            className="absolute left-0 top-1.5 hover:cursor-pointer"
            onClick={handleDisconnect}
          />
          <p>{roomName}</p>
        </div>
        <div
          className="flex flex-col h-full overflow-y-scroll"
          ref={chatRoomRef}
        >
          {chatList?.map((val, idx) => {
            const {
              messageId,
              message,
              userId: senderId,
              name,
              userProfileImgPath,
              messageTime,
            } = val;

            return (
              <React.Fragment key={messageId}>
                {idx === 0 ||
                  (idx !== 0 &&
                    parseDate(chatList[idx - 1].messageTime) !==
                      parseDate(messageTime) && (
                      <DateDivider
                        messageTime={parseDate(messageTime) as string}
                      />
                    ))}
                <ChatMessage
                  type={senderId === user.userId ? 'my' : 'other'}
                  message={message}
                  name={name}
                  userProfileImgPath={userProfileImgPath}
                  messageTime={messageTime}
                />
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex p-2.5 sticky bottom-0 bg-white">
          <input
            type="text"
            className="relative flex-1 p-1 border border-black"
            value={chatMessage}
            ref={messageRef}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            disabled={chatMessage.length === 0}
            onClick={handleClickSend}
            className="w-20 p-2 ml-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70 sm:w-24 sm:text-base"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
