export const linkList = [
  { name: "게시판", href: "/board" },
  { name: "Q&A", href: "/qna" },
  { name: "채팅방", href: "/chatroom" },
];

export const menuViewLinkList = [
  ...linkList,
  { name: "로그인", href: "/login" },
];

export const initialLoginValue = { userId: "", password: "" };

export const errorMessage = {
  blankID: "아이디는 필수 입력값 입니다.",
  blankPassword: "비밀번호는 필수 입력값 입니다.",
};
