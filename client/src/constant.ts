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
  blankName: '이름은 필수 입력값 입니다.',
  blankEmail: '이메일을 입력해주세요.',
  minIDLength: '아이디는 최소 6자 이상입니다.',
  maxIDLength: '아이디는 최대 12자 이하입니다.',
  invalidFormatPassword: '비밀번호 양식이 맞지 않습니다.',
  mismatchPassword: '비밀번호가 일치하지 않습니다.',
  invalidFormatEmail: '이메일 양식이 맞지 않습니다',
  blankTitle: '제목을 입력해 주세요.',
});

export const errorCodeToMessage = Object.freeze({
  USER_NOT_EXIST: '유저가 존재하지 않습니다.',
  INVALID_PASSWORD: '비밀번호가 맞지 않습니다.',
});

export const initialSignupValue = {
  userId: '',
  password: '',
  passwordCheck: '',
  name: '',
  profileImg: '',
  email: '',
  school: '',
  job: '',
  startYear: '',
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
// 이미지 파일 최대용량 10MB
export const IMAGE_FILE_MAX_SIZE = 10 * 1024 * 1024;

// 개발시작연도 선택 상수
const thisYear = new Date().getFullYear();
export const developExperience = Array.from(
  { length: 60 },
  (_, i) => thisYear - i
);

export const MODAL_TITLE = {
  success: '성공',
  warning: '경고',
  error: '오류',
};
