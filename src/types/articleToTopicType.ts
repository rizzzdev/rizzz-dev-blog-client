import { TopicTypeExtends } from "./topicType";
import { ArticleTypeExtends } from "./articleType";

export interface RequestArticleToTopicType {
  articleId: string;
  topicId: string;
}

export interface ArticleToTopicType extends RequestArticleToTopicType {
  readonly id?: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface ArticleToTopicTypeExtends extends ArticleToTopicType {
  article?: ArticleTypeExtends;
  topic?: TopicTypeExtends;
}
