export interface IComment {
  commentAuthorDevelopAnnual: string;
  commentAuthorId: string;
  commentAuthorName: string;
  commentAuthorProfileImgPath: string;
  commentContent: string;
  commentCreatedAt: string;
  commentOriginId: string;
  commentUpdatedAt: string;
}
export interface IPostInformation {
  commentsCount: number;
  postAuthorDevelopAnnual: string;
  postAuthorId: string;
  postAuthorName: string;
  postAuthorProfileImgPath: string;
  postContent: string;
  postCreatedAt: string;
  postOriginId: string;
  postTitle: string;
  postType: string;
  postUpdatedAt: string;
}

export interface IUserInfo {
  company?: string;
  companyEmail?: string;
  companyEmailAuthentication?: boolean;
  developAnnual?: number;
  email?: string;
  name?: string;
  post?: Array<object>;
  school?: string;
  schoolEmail?: string;
  schoolEmailAuthentication?: boolean;
  userId: string;
  userProfileImgPath?: string;
}

export interface UserInputData {
  userId?: string;
  password: string;
  passwordConfirm?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
  name?: string;
  email?: string;
  school?: string;
  schoolEmail: string;
  company?: string;
  companyEmail: string;
  developAnuual?: number;
}

export interface ISignupData {
  userId: string;
  password: string;
  name: string;
  email: string;
  company: string;
  school: string;
  developYear: string;
}

export interface ICheckID {
  state: boolean;
  isDuplicate?: boolean;
  message?: string;
}

export enum EmailState {
  None,
  Submitting,
  Submitted,
}

export interface IFlexLabelContent {
  label: string;
  content: React.ReactNode | string;
}
