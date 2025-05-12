import { ArticleTypeExtends } from "./articleType";

export interface RequestSeriesType {
  seriesName: string;
}

export interface SeriesType extends RequestSeriesType {
  readonly id?: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface SeriesTypeExtends extends SeriesType {
  articles: ArticleTypeExtends[];
}
