import { ArticleTypeExtends } from "./articleType";
import { UserTypeExtend } from "./userType";

export interface RequestReactionType {
  userId: string;
  articleId: string;
  reactionText: string;
}

export interface ReactionType extends RequestReactionType {
  readonly id?: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface ReactionTypeExtends extends ReactionType {
  user?: UserTypeExtend;
  article?: ArticleTypeExtends;
}
