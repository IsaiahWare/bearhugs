import { 
  MatchSendRequest,
  MatchRequestsRequest,
  MatchMatchesRequest,
  MatchUnmatchRequest,
  MatchRejectRequest,
  MatchRejectedMatchesRequest
} from "../models/matchControllerModels";

export function isMatchSendRequest(obj: any): obj is MatchSendRequest {
  return obj.requesterId !== undefined && obj.requesteeId !== undefined && Object.keys(obj).length === 2;
}

export function isMatchRequestsRequest(obj: any): obj is MatchRequestsRequest {
  return obj.userId !== undefined && Object.keys(obj).length == 1;
}

export function isMatchMatchesRequest(obj: any): obj is MatchMatchesRequest {
  return obj.userId !== undefined && Object.keys(obj).length == 1;
}

export function isMatchUnmatchRequest(obj: any): obj is MatchUnmatchRequest {
  return obj.userId1 !== undefined && obj.userId2 !== undefined && Object.keys(obj).length == 2;
}

export function isMatchRejectRequest(obj: any): obj is MatchRejectRequest {
  return obj.requesterId !== undefined && obj.requesteeId !== undefined && Object.keys(obj).length == 2;
}

export function isMatchRejectedMatchesRequest(obj: any): obj is MatchRejectedMatchesRequest {
  return obj.userId !== undefined && Object.keys(obj).length == 1;
}
