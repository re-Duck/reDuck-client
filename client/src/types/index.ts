export interface IComment {
  commentOriginId: number;
  commentContent: string;
  commentCreatedAt: string;
  commentUpdatedAt: string;
  commentAuthorId: string;
  commentAuthorName: string;
}
export interface IPostInformation {
  comments: Array<IComment> | null;
  postAuthorDevelopAnnual: string;
  postAuthorId: string;
  postAuthorName: string;
  postAuthorProfileImg: {
    uploadedFileName: string;
    storagedFileName: string;
    extension: string;
    size: number;
    path: string;
  };
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
  userId?: string;
  userProfileImgPath?: string;
}

export enum EmailState {
  None,
  Submitting,
  Submitted,
}
