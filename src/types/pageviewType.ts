import { ArticleTypeExtends } from "./articleType";
import { UserTypeExtend } from "./userType";

export interface RequestPageviewType {
  userId: string;
  articleId?: string;
}

export interface PageviewType extends RequestPageviewType {
  readonly id?: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface PageviewTypeExtends extends PageviewType {
  user?: UserTypeExtend;
  article?: ArticleTypeExtends;
}
