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
  comments: Array<IComment> | null;
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

export enum EmailState {
  None,
  Submitting,
  Submitted,
}
