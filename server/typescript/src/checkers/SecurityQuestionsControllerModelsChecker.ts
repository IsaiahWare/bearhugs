import { SecurityQuestionsSendRequest,  SecurityQuestionsGetRequest } from "../models/securityQuestionsControllerModels"

export function isSecurityQuestionsSendRequest(obj: any): obj is SecurityQuestionsSendRequest {
  return obj.userId !== undefined &&
  obj.SecurityQuestions !== undefined &&
  Object.keys(obj).length === 2;
}

export function isSecurityQuestionsGetRequest(obj: any): obj is SecurityQuestionsGetRequest {
  return obj.userId !== undefined &&
  Object.keys(obj).length === 1;
}

