import { AuthorTypeExtends } from "./authorType";

export interface RequestSessionType {
  authorId: string;
  password: string;
}

export interface SessionType extends RequestSessionType {
  readonly id?: string;
  loggedInAt: Date;
  loggedOutAt?: Date;
}

export interface SessionTypeExtend extends SessionType {
  author?: AuthorTypeExtends;
}
