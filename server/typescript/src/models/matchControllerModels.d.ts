declare module "matchControllerModels";

export interface MatchSendRequest {
    requesterId: number;
    requesteeId: number;
}

export interface MatchRequestsRequest {
    userId: number;
}

export interface MatchMatchesRequest {
    userId: number;
}

export interface MatchUnmatchRequest {
    userId1: number;
    userId2: number;
}

export interface MatchRejectRequest {
    requesterId: number;
    requesteeId: number;
}

export interface MatchRejectedMatchesRequest {
    userId: number;
}