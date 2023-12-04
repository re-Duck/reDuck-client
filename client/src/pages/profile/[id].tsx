import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

// components
import { Layout, Avatar, Divider, UserInfo, EditProfile } from '@/components';

// service
import { BASE_URL } from '@/service/base/api';
import { userManager } from '@/service/user';

// constant
import { sideBarList } from '@/constants/constant';

// types
import { IUserInfo, MyPageTab } from '@/types';
import { IReduxState } from '@/types/redux/IReduxState';

// icons
import { Icon } from '@iconify/react';

export default function Profile({
  pageProps,
}: {
  pageProps: {
    userData: IUserInfo;
  };
}) {
  const router = useRouter();

  const user = useSelector((state: IReduxState) => state.auth);

  const isMyPage = router.query.id === user.userId;

  const [selectedMenu, setSelectedMenu] = useState<MyPageTab>('프로필');

  const { userData } = pageProps;
  const { company, name, school, userProfileImgPath } = userData;

  const handleSelectMenu = (content: MyPageTab) => {
    setSelectedMenu(content);
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:max-w-5xl sm:p-8 sm:mx-auto sm:gap-x-16">
        <div className="hidden sm:flex-none sm:text-center sm:block">
          <Avatar
            src={`${BASE_URL}${userProfileImgPath || ''}`}
            alt="profileImg"
            size="xl"
          />
          <div className="mt-4">
            <p>{name}</p>
            <p>{company}</p>
            <p>{school}</p>
          </div>
          <Divider type="horizental" margin={4} thin={2} />
          <ul>
            {sideBarList.map(({ content, iconName }) => (
              <li
                key={content}
                className={`${
                  content === selectedMenu &&
                  'before:block before:absolute before:w-1 before:h-8 before:translate-x-[-15px] before:bg-indigo-600 before:rounded-sm bg-gray-200'
                } text-left rounded-md p-2 text-sm font-semibold text-black hover:bg-gray-200 flex items-center`}
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
        <ul className="flex mb-4 sm:hidden">
          {sideBarList.map(({ content, iconName }) => (
            <li
              key={content}
              className={`${
                content === selectedMenu &&
                'before:block before:absolute before:w-1/5 before:h-1 before:translate-y-[28px] before:bg-indigo-600 before:rounded-sm bg-gray-200'
              } rounded-md p-2 text-sm font-semibold text-black hover:bg-gray-200 flex flex-col grow justify-center items-center`}
              onClick={() => handleSelectMenu(content)}
            >
              <Icon
                icon={iconName}
                fontSize={24}
                strokeWidth={3}
                color="black"
              />
              <span>{content}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col flex-1">
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
  const userData = await userManager.getUser(id);
  return {
    props: {
      userData,
    },
  };
}
