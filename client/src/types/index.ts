export interface IPostInformation {
  comments: string | null;
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
  postContentPath: string;
  postCreatedAt: string;
  postOriginId: string;
  postTitle: string;
  postType: string;
  postUpdatedAt: string;
}
