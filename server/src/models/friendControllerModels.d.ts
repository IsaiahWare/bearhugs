declare module "friendControllerModels";

export interface FriendSendRequest {
    requesterId: number;
    requesteeId: number;
}

export interface FriendRequestsRequest {
    userId: number;
}

export interface FriendFriendsRequest {
    userId: number;
}

export interface FriendUnfriendRequest {
    userId1: number;
    userId2: number;
}

export interface FriendRejectRequest {
    requesterId: number;
    requesteeId: number;
}

export interface FriendRejectedFriendsRequest {
    userId: number;
}