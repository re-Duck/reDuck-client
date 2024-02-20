import { MyPageTab } from '@/types';

export const linkList = [
  { name: '채팅방', href: '/chat' },
  { name: 'GPT', href: '/mygpt' },
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
  invalidFormatId: '아이디는 6 ~ 12자 영어 소문자, 숫자로 이뤄집니다',
  invalidFormatPassword:
    '비밀번호는 8 ~ 15자 영문, 숫자, 특수문자를 최소 한가지씩 포함 입니다.',
  mismatchPassword: '비밀번호가 일치하지 않습니다.',
  invalidFormatEmail: '이메일 양식이 맞지 않습니다',
  blankTitle: '제목을 입력해 주세요.',
  duplicateId: '사용중인 아이디 입니다.',
  network: '네트워크 오류 입니다.',
  checkDuplicateId: '아이디 중복확인을 진행해주세요',
  checkCertificateEmail: '이메일 인증을 진행해주세요',
  needLogin: '로그인이 필요합니다.',
  blankComment: '댓글을 입력해주세요.',
  notComplete: '준비 중인 기능입니다.',
  imageCapacityExceeded: '이미지 용량 초과 입니다.',
  failedUploadImage: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
  failedSendingEmail: '이메일 전송에 실패했습니다. 다시 시도해주세요',
  notmatchConfirmNumber:
    '메일의 인증번호와 일치하지 않습니다. 인증번호를 확인해주세요.',
  failedSignUp: '회원가입에 실패했습니다. 다시 시도해주세요.',
  socket: '소켓 연결에 문제가 발생했습니다. 페이지를 새로고침해주세요.',
  failedCreateChatRoom: '채팅방 생성에 실패했습니다. 다시 시도해주세요',
  maxQuestion: '하루 최대 질문 수를 초과했습니다.',
  sessionExpiration: '세션이 만료됐습니다. 다시 로그인해주세요',
  failedGetUser: '유저 정보 불러오는데 실패했습니다. 다시 시도해주세요',
  UnknownFollowRequest: '팔로우 요청과정에서 알 수 없는 오류 발생',
  UnknownFollowCheck: '팔로우 확인과정에서 알 수 없는 오류 발생',
  Unknown: '알 수 없는 에러가 발생했습니다. 관리자에게 문의하세요',
  networkError: '일시적인 네트워크 오류입니다.',
  tryAgain: '잠시후 다시 시도해주세요.',
  error: '에러입니다.',
});

export const errorCodeToMessage = Object.freeze({
  'INVALID_TYPING': '잘못된 입력으로 인한 오류입니다. 다시 시도해주세요',
  'USER_NOT_EXIST': '유저가 존재하지 않습니다.',
  'INVALID_PASSWORD': '비밀번호가 맞지 않습니다.',
  'UNAUTHENTICATED_EMAIL': '이메일 인증이 필요합니다.',
  'INVALID_PARAMETER': '필수 입력 값을 채워주세요',
  '': '알 수 없는 오류입니다.',
  'undefined': '알 수 없는 오류입니다.',
});

export const successMessage = Object.freeze({
  commentSuccess: '댓글이 등록되었습니다.',
  commentDeleteSuccess: '댓글이 삭제되었습니다.',
  commentUpdateSuccess: '댓글이 수정되었습니다.',
  postSuccess: '게시글이 등록되었습니다.',
  postDeleteSuccess: '게시글이 삭제되었습니다.',
  postUpdateSuccess: '게시글이 수정되었습니다.',
  signUpSuccess: '회원가입에 성공했습니다. 다시 로그인해주세요.',
  profileUpdateSuccess: '회원정보 수정이 완료되었습니다.',
  availableIdSuccess: '사용할 수 있는 아이디입니다.',
  copylinkSuccess: '링크를 복사했습니다.',
  sendingEmailSuccess:
    '이메일이 전송됐습니다. 메일함을 확인하시고 5분 이내로 인증번호를 입력하고 확인해주세요.',
  confirmNumberSuccess: '정상적으로 인증 완료됐습니다.',
  withdrawalSuccess:
    '정상적으로 탈퇴됐습니다. 지금까지 reDuck을 이용해주셔서 감사합니다.',
  scrapSuccess: '게시글을 성공적으로 저장했습니다.',
});

export const warningMessage = Object.freeze({
  confirmDeletePost: '정말로 게시글을 삭제하시겠습니까?',
  confirmDeleteComment: '정말로 댓글을 삭제하시겠습니까?',
  confirmGoOut: '정말로 나가시겠습니까?',
  confirmWithdrawal:
    '정말 회원 탈퇴하시겠습니까? 회원님의 모든 활동기록과 정보가 사라집니다.',
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

export const sideBarList: { content: MyPageTab; iconName: string }[] = [
  {
    content: '프로필',
    iconName: 'uil:user',
  },
  {
    content: '활동기록',
    iconName: 'tabler:activity',
  },
  {
    content: '친구목록',
    iconName: 'ph:users-bold',
  },
  {
    content: '덕력치',
    iconName: 'bi:bar-chart-fill',
  },
];

export enum ModalType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  CLOSE = 'close',
}

export enum AlertType {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
  CLOSE = 'close',
}

export const iconInfo = Object.freeze({
  success: {
    color: 'green',
    shape: 'material-symbols:check-circle-outline',
  },
  warning: {
    color: 'orange',
    shape: 'tabler:alert-triangle',
  },
  info: {
    color: 'cyan',
    shape: 'material-symbols:info-outline',
  },
  error: {
    color: 'red',
    shape: 'mingcute:alert-octagon-line',
  },
});

export const regex = Object.freeze({
  id: /^[a-z0-9]{6,12}$/,
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
});

export const SCROLL_STATE_CHANGE_INTERVAL = 150;

export const SCROLL_TOP_BOUNDARY = 150;
