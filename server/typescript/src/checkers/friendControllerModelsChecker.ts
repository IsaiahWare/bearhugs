import { 
  FriendSendRequest,
  FriendRequestsRequest,
  FriendFriendsRequest,
  FriendUnfriendRequest,
  FriendRejectRequest,
  FriendRejectedFriendsRequest
} from "../models/friendControllerModels";

export function isFriendSendRequest(obj: any): obj is FriendSendRequest {
  return obj.requesterId !== undefined && obj.requesteeId !== undefined && 
  Object.keys(obj).length === 2;
}

export function isFriendRequestsRequest(obj: any): obj is FriendRequestsRequest {
  return obj.userId !== undefined && Object.keys(obj).length == 1;
}

export function isFriendFriendsRequest(obj: any): obj is FriendFriendsRequest {
  return obj.userId !== undefined && Object.keys(obj).length == 1;
}

export function isFriendUnfriendRequest(obj: any): obj is FriendUnfriendRequest {
  return obj.userId1 !== undefined && obj.userId2 !== undefined && Object.keys(obj).length == 2;
}

export function isFriendRejectRequest(obj: any): obj is FriendRejectRequest {
  return obj.requesterId !== undefined && obj.requesteeId !== undefined && Object.keys(obj).length == 2;
}

export function isFriendRejectedFriendsRequest(obj: any): obj is FriendRejectedFriendsRequest {
  return obj.userId !== undefined && Object.keys(obj).length == 1;
}
