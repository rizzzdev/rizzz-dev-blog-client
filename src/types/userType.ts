import { ReactionTypeExtends } from "./reactionType";
import { StarTypeExtends } from "./starType";
import { PageviewTypeExtends } from "./pageviewType";

export interface RequestUserType {
  fullName: string;
}

export interface UserType extends RequestUserType {
  readonly id?: string;
  registeredAt: Date;
  deletedAt?: Date;
}

export interface UserTypeExtend extends UserType {
  reactions?: ReactionTypeExtends[];
  stars?: StarTypeExtends[];
  pageviews?: PageviewTypeExtends[];
}
