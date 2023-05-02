export const linkList = [
  { name: '게시판', href: '/board' },
  { name: 'Q&A', href: '/qna' },
  { name: '채팅방', href: '/chatroom' },
];

export const menuViewLinkList = [
  ...linkList,
  { name: '로그인', href: '/login' },
];

export const initialLoginValue = Object.freeze({ userId: '', password: '' });

export const errorMessage = Object.freeze({
  blankID: '아이디는 필수 입력값 입니다.',
  blankPassword: '비밀번호는 필수 입력값 입니다.',
  blankTitle: '제목을 입력해 주세요.',
});

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

export const quillModules = Object.freeze({
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
  ],
  clipboard: {
    matchVisual: false,
  },
});

export const quillFormats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];
