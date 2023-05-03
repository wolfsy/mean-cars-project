import * as mongodb from "mongodb";

export interface RefreshToken {
  _id?: mongodb.ObjectId;
  userId: mongodb.ObjectId;
  token: string;
  expiresAt: Date;
  createdByIp: string;
  revokedAt?: Date;
  revokedByIp?: string;
  replacedByToken?: string;
}