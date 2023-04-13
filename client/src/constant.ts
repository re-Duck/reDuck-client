export const linkList = [
  { name: '게시판', href: '/board' },
  { name: 'Q&A', href: '/qna' },
  { name: '채팅방', href: '/chatroom' },
];

export const menuViewLinkList = [...linkList, { name: '로그인', href: '/login' }];

export const initialLoginValue = { userId: '', password: '' };

export const errorMessage = {
  blankID: "아이디는 필수 입력값 입니다.",
  blankPassword: "비밀번호는 필수 입력값 입니다.",
};

export const postList = [
  {
    postOriginId: 1,
    title: '제목1',
    content: '내용1',
    writer: '작성자1',
    date: '2021-10-10',
    view: 1,
  },
  {
    postOriginId: 2,
    title: '제목2',
    content: '내용2',
    writer: '작성자2',
    date: '2021-10-10',
    view: 2,
  },
  {
    postOriginId: 3,
    title: '제목3',
    content: '내용3',
    writer: '작성자3',
    date: '2021-10-10',
    view: 3,
  },
  {
    postOriginId: 4,
    title: '제목4',
    content: '내용4',
    writer: '작성자4',
    date: '2021-10-10',
    view: 4,
  },
  {
    postOriginId: 5,
    title: '제목5',
    content: '내용5',
    writer: '작성자5',
    date: '2021-10-10',
    view: 5,
  },
];
