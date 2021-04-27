import { SendQuizResultsRequest,  FindQuizResultsRequest } from "./../models/quizControllerModels"

export function isSendQuizResultsRequest(obj: any): obj is SendQuizResultsRequest {
  return obj.userId !== undefined &&
  obj.quizResults !== undefined &&
  Object.keys(obj).length === 2;
}

export function isFindQuizResultsRequest(obj: any): obj is FindQuizResultsRequest {
  return obj.userId !== undefined &&
  Object.keys(obj).length === 1;
}

