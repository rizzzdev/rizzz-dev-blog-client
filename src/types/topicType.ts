import { ArticleToTopicTypeExtends } from "./articleToTopicType";

export interface RequestTopicType {
  topicName: string;
}

export interface TopicType extends RequestTopicType {
  readonly id?: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface TopicTypeExtends extends TopicType {
  articles?: ArticleToTopicTypeExtends[];
}
