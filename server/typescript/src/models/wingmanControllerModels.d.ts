declare module "wingmanControllerModels";

export interface WingmanSendRequest {
    requesterId: number;
    requesteeId: number;
}

export interface WingmanRequestsRequest {
    userId: number;
}

export interface WingmanMatchesRequest {
    userId: number;
}

export interface WingmanUnmatchRequest {
    userId1: number;
    userId2: number;
}

export interface WingmanRejectRequest {
    requesterId: number;
    requesteeId: number;
}

export interface WingmanRejectedMatchesRequest {
    userId: number;
}
