'use client';

// react, next
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';

// components
import { ChatRoom, ChatUserList } from './components';

// hooks
import useModal from '@/hooks/modal/useModal';

// services
import axios from 'axios';

// third-party
import { Stomp, CompatClient, IMessage } from '@stomp/stompjs';
import { v4 } from 'uuid';

// types
import { IChatMessage, IChatRoomInfo } from '@/types';
import { IReduxState } from '@/types/redux/IReduxState';

// constant
import { ModalType, errorMessage } from '@/constants/constant';

export default function Chatroom() {
  const user = useSelector((state: IReduxState) => state.auth);
  const headers = {
    Authorization: axios.defaults.headers.common['Authorization'] as string,
  };
  const { userId } = user;
  const { openModal } = useModal();

  const [openChat, setOpenChat] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<IChatRoomInfo>({
    roomId: '',
    roomName: '',
  });
  const [subId, setSubId] = useState('');

  const [chatList, setChatList] = useState<IChatMessage[]>([]);

  const clientRef = useRef<CompatClient>();

  // 채팅방 연결
  const handleConnect = ({ roomId, roomName }: IChatRoomInfo) => {
    const client = clientRef.current;

    const subscribe_callback = (message: IMessage) => {
      const chatData = JSON.parse(message.body);
      setChatList((chat) => [...chat, chatData]);
    };
    if (client && !client.connected) {
      const connect_callback = () => {
        // STOMP 클라이언트의 연결 상태 확인
        if (!client.connected) {
          console.error('STOMP 연결 상태: 연결 안 됨');
          return;
        }
        const subscription = client.subscribe(
          `/sub/chat/room/${roomId}`,
          subscribe_callback,
          headers
        );
        setSubId(subscription.id);
      };
      client.connect(headers, connect_callback);
    } else if (client && client.connected) {
      const subscription = client.subscribe(
        `/sub/chat/room/${roomId}`,
        subscribe_callback,
        headers
      );
      setSubId(subscription.id);
    }
    setSelectedRoom({ roomId, roomName });
    setOpenChat(true);
  };

  const handleDisconnect = () => {
    const client = clientRef.current;
    if (client && client.connected) {
      client.unsubscribe(subId, headers);
      setOpenChat(false);
      setSelectedRoom({ roomId: '', roomName: '' });
    }
  };

  const handleSendMessage = useCallback(
    (chatMessage: string) => {
      const client = clientRef.current;

      if (user) {
        if (client && client.connected) {
          const objectbody = {
            roomId: selectedRoom.roomId,
            message: chatMessage,
            messageId: v4(),
            userId,
            type: 'CHAT',
          };

          const body = JSON.stringify(objectbody);

          client.publish({
            destination: '/pub/chat/message',
            body,
            headers,
          });
        }
      }
    },
    [user, selectedRoom]
  );

  useEffect(() => {
    const client = Stomp.client(`${process.env.NEXT_PUBLIC_CHAT_URL}`);
    const roomId = useSearchParams().get('roomId');
    const roomName = useSearchParams().get('roomName');

    clientRef.current = client;

    // 에러 이벤트 핸들러
    client.onStompError = (frame) => {
      console.error('Broker reported error: ', frame.headers['message']);
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.socket,
        callback: () => {
          //router.reload();
          useRouter().refresh();
        },
      });
    };

    if (roomId) {
      handleConnect({
        roomId: roomId as string,
        roomName: roomName as string,
      });
    }

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <div className="relative mx-auto flex max-w-5xl h-[calc(100vh-6rem)] sm:pt-8">
      <ChatUserList
        enteredRoomId={selectedRoom.roomId}
        handleConnect={handleConnect}
        handleDisconnect={handleDisconnect}
      />
      {openChat && (
        <ChatRoom
          roomInfo={selectedRoom}
          chatList={chatList}
          setChatList={setChatList}
          handleSendMessage={handleSendMessage}
          handleDisconnect={handleDisconnect}
        />
      )}
    </div>
  );
}
