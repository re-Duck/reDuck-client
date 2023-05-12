export interface IPostInformation {
  comments: Array<string> | null;
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
