import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useModal } from '@/hooks';
import { useSession } from 'next-auth/react';

// components
import { Layout, Avatar, Divider, UserInfo, EditProfile } from '@/components';

// service
import { BASE_URL, axios_get } from '@/service/base/api';
import { withdrawal } from '@/service/withdrawal';

// constant
import {
  ModalType,
  errorMessage,
  sideBarList,
  successMessage,
  warningMessage,
} from '@/constants/constant';

// types
import { IUserInfo } from '@/types';
import { Icon } from '@iconify/react';

export default function Profile({
  pageProps,
}: {
  pageProps: {
    userData: IUserInfo;
  };
}) {
  const router = useRouter();

  const session = useSession();
  const user = session.data?.user;

  const { openModal, closeModal } = useModal();

  const isMyPage = router.query.id === user?.id;

  const [selectedMenu, setSelectedMenu] = useState<string>('내 정보');

  const { userData } = pageProps;
  const { company, name, school, userProfileImgPath } = userData;

  const handleSelectMenu = (content: string) => {
    if (content === '회원탈퇴') {
      openModal({
        type: ModalType.WARNING,
        message: warningMessage.confirmWithdrawal,
        callback: async () => {
          const flag = await withdrawal(user ? user.token : '');
          closeModal();
          flag
            ? openModal({
                type: ModalType.SUCCESS,
                message: successMessage.withdrawalSuccess,
                callback: () => {
                  closeModal();
                  router.replace('/');
                },
              })
            : openModal({
                type: ModalType.ERROR,
                message: errorMessage.error,
              });
        },
      });
    } else {
      setSelectedMenu(content);
    }
  };
  //TODO: 반응형 디자인 고려하기 (모바일 디자인)
  return (
    <Layout>
      <div className="flex max-w-5xl p-8 mx-auto gap-x-16">
        <div className="flex-none text-center">
          <Avatar
            src={`${BASE_URL}${
              userProfileImgPath === undefined ? '' : userProfileImgPath
            }`}
            alt="profileImg"
            size="xl"
          />
          <div className="mt-4">
            <p>{name}</p>
            <p>@{company}</p>
            <p>{school}</p>
          </div>
          <Divider type="horizental" margin={4} thin={2} />
          <ul className="hidden sm:block">
            {sideBarList.map(({ content, iconName }) => (
              <li
                key={content}
                className={`${
                  content === selectedMenu &&
                  'before:block before:absolute before:w-1 before:h-8 before:translate-x-[-15px] before:bg-indigo-600 before:rounded-sm bg-gray-200'
                } text-left rounded-md p-2 text-sm font-semibold text-black hover:bg-gray-200 flex items-center
                ${content === '회원탈퇴' && !isMyPage && `hidden`}`}
                onClick={() => handleSelectMenu(content)}
              >
                <Icon
                  icon={iconName}
                  fontSize={15}
                  strokeWidth={3}
                  color="black"
                />
                <span className="ml-4">{content}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 bg-white border">
          {isMyPage ? (
            <EditProfile userData={userData} />
          ) : (
            <UserInfo userData={userData} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const suburl = `/user/${id}`;
  const res = await axios_get({
    suburl,
  });
  return {
    props: {
      userData: res.data,
    },
  };
}
