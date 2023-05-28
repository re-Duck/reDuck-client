import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

// components
import {
  Layout,
  Avatar,
  Divider,
  Icon,
  UserInfo,
  EditProfile,
} from '@/components';

// service
import { BASE_URL, axios_get } from '@/service/base/api';
import { sideBarList } from '@/constant';

export default function Profile({ pageProps }: { pageProps: object }) {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  const isMyPage = router.query.id === authState.userId;

  const [selectedMenu, setSelectedMenu] = useState('내 정보');

  const { userData } = pageProps;
  const { company, name, posts, school, userProfileImgPath } = userData;
  //TODO: 반응형 디자인 고려하기 (모바일 디자인)
  return (
    <Layout>
      <div className="flex mx-auto max-w-5xl p-8 gap-x-16">
        <div className="flex-none text-center">
          <Avatar
            src={`${BASE_URL}${userProfileImgPath}`}
            alt="profileImg"
            size="lg"
          />
          <div className="mt-4">
            <p>{name}</p>
            <p>@{company}</p>
            <p>{school}</p>
          </div>
          <Divider type="horizental" margin={4} thin={2} />
          <ul className="sm:block hidden">
            {sideBarList.map(({ content, iconName }, id) => (
              <li
                key={id}
                className={`${
                  content === selectedMenu &&
                  'before:block before:absolute before:w-1 before:h-8 before:translate-x-[-15px] before:bg-indigo-600 before:rounded-sm bg-gray-200'
                } text-left rounded-md p-2 text-sm font-semibold text-black hover:bg-gray-200 flex items-center`}
                onClick={() => setSelectedMenu(content)}
              >
                <Icon name={iconName} size={15} strokeWidth={3} color="black" />
                <span className="ml-4">{content}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 border">
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
