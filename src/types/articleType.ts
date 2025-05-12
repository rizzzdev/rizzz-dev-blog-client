import { AuthorTypeExtends } from "./authorType";
import { ReactionTypeExtends } from "./reactionType";
import { StarTypeExtends } from "./starType";
import { PageviewTypeExtends } from "./pageviewType";
import { SeriesTypeExtends } from "./seriesType";

export interface RequestArticleType {
  title: string;
  description: string;
  articleMarkdown: string;
  seriesId?: string | null;
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
  pageviews?: PageviewTypeExtends[];
  author?: AuthorTypeExtends;
  series?: SeriesTypeExtends;
}
