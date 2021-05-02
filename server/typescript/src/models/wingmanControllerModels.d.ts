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
   requestId:number
}

export interface WingmanRejectRequest {
    requestId:number
}

export interface WingmanRejectedMatchesRequest {
    userId: number;
}
