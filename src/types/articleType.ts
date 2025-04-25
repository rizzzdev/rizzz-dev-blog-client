import { AuthorTypeExtends } from "./authorType";
import { ReactionTypeExtends } from "./reactionType";
import { StarTypeExtends } from "./starType";
import { PageviewTypeExtends } from "./pageviewType";
import { ArticleToTopicTypeExtends } from "./articleToTopicType";

export interface RequestArticleType {
  title: string;
  description: string;
  articleMarkdown: string;
  imageUrl?: string;
  authorId: string;
}

export interface ArticleType extends RequestArticleType {
  readonly id?: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface ArticleTypeExtends extends ArticleType {
  stars?: StarTypeExtends[];
  reactions?: ReactionTypeExtends[];
  topics?: ArticleToTopicTypeExtends[];
  pageviews?: PageviewTypeExtends[];
  author?: AuthorTypeExtends;
}
