import { 
  WingmanSendRequest,
  WingmanRequestsRequest,
  WingmanMatchesRequest,
  WingmanUnmatchRequest,
  WingmanRejectRequest,
  WingmanRejectedMatchesRequest
} from "../models/wingmanControllerModels";

export function isWingmanSendRequest(obj: any): obj is WingmanSendRequest {
  return obj.requesterId !== undefined && obj.requesteeId !== undefined && Object.keys(obj).length === 2;
}

export function isWingmanRequestsRequest(obj: any): obj is WingmanRequestsRequest {
  return obj.userId !== undefined && Object.keys(obj).length == 1;
}

export function isWingmanMatchesRequest(obj: any): obj is WingmanMatchesRequest {
  return obj.userId !== undefined && Object.keys(obj).length == 1;
}

export function isWingmanUnmatchRequest(obj: any): obj is WingmanUnmatchRequest {
  return obj.requestId !== undefined && Object.keys(obj).length == 1;
}

export function isWingmanRejectRequest(obj: any): obj is WingmanRejectRequest {
  return obj.requestId !== undefined && Object.keys(obj).length == 1;
}

export function isWingmanRejectedMatchesRequest(obj: any): obj is WingmanRejectedMatchesRequest {
  return obj.userId !== undefined && Object.keys(obj).length == 1;
}
