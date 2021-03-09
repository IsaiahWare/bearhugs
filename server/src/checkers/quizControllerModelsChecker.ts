import { SendQuizResultsRequest,  FindQuizResultsRequest } from "./../models/quizControllerModels"

export function isSendQuizResultsRequest(obj: any): obj is SendQuizResultsRequest {
  return obj.id !== undefined &&
  obj.quizResults !== undefined &&
  Object.keys(obj).length === 2;
}

export function isFindQuizResultsRequest(obj: any): obj is FindQuizResultsRequest {
  return obj.id !== undefined &&
  Object.keys(obj).length === 1;
}

