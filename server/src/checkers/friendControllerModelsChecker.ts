import { UserFriendFindRequest } from "../models/friendControllerModels";

export function isUserFriendFindRequest(obj: any): obj is UserFriendFindRequest {
  return obj.userId !== undefined && Object.keys(obj).length === 1;
}

