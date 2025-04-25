import { ArticleTypeExtends } from "./articleType";
import { UserTypeExtend } from "./userType";

export interface RequestStarType {
  userId: string;
  articleId: string;
}

export interface StarType extends RequestStarType {
  readonly id?: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface StarTypeExtends extends StarType {
  article?: ArticleTypeExtends;
  user?: UserTypeExtend;
}
