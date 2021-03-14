import { UserFriendRequest } from "../models/friendControllerModels";

export function isUserFriendRequest(obj: any): obj is UserFriendRequest {
  return obj.userId !== undefined && Object.keys(obj).length === 1;
}

