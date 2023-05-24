export const linkList = [
  { name: '게시판', href: '/board' },
  { name: 'Q&A', href: '/qna' },
  { name: '채팅방', href: '/chatroom' },
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
  duplicateId: '사용중인 아이디 입니다.',
  network: '네트워크 오류 입니다.',
  checkDuplicateId: '아이디 중복확인을 진행해주세요',
  checkCertificateEmail: '이메일 인증을 진행해주세요',
  needLogin: '로그인이 필요합니다.',
  blankComment: '댓글을 입력해주세요.',
});

export const errorCodeToMessage = Object.freeze({
  INVALID_TYPING: '잘못된 입력으로 인한 오류입니다. 다시 시도해주세요',
  USER_NOT_EXIST: '유저가 존재하지 않습니다.',
  INVALID_PASSWORD: '비밀번호가 맞지 않습니다.',
});

export const successMessage = Object.freeze({
  commentSuccess: '댓글이 등록되었습니다.',
  commentDeleteSuccess: '댓글이 삭제되었습니다.',
  commentUpdateSuccess: '댓글이 수정되었습니다.',
  postSuccess: '게시글이 등록되었습니다.',
  postDeleteSuccess: '게시글이 삭제되었습니다.',
  postUpdateSuccess: '게시글이 수정되었습니다.',
});

export const initialSignupValue = {
  userId: '',
  password: '',
  passwordConfirm: '',
  name: '',
  email: '',
  school: '',
  company: '',
  developYear: '',
};

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

export const POSTS_INISIATE_VALUE = Object.freeze({
  data: [],
  nextPageParms: null,
});

export const sideBarList = [
  '내 정보',
  '활동기록',
  '친구목록',
  '덕력치',
  '회원탈퇴',
];

export enum ModalType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  CLOSE = 'close',
}

export const iconInfo = Object.freeze({
  success: {
    color: 'green',
    shape: 'check-circle',
  },
  warning: {
    color: 'orange',
    shape: 'alert-triangle',
  },
  error: {
    color: 'red',
    shape: 'alert-octagon',
  },
});
