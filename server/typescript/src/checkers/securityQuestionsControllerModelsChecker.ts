import { SecurityQuestionsSendRequest,  SecurityQuestionsGetRequest } from "../models/securityQuestionsControllerModels"

export function isSecurityQuestionsSendRequest(obj: any): obj is SecurityQuestionsSendRequest {
  return obj.email !== undefined &&
  obj.securityQuestions !== undefined &&
  Object.keys(obj).length === 2;
}

export function isSecurityQuestionsGetRequest(obj: any): obj is SecurityQuestionsGetRequest {
  return obj.email !== undefined &&
  Object.keys(obj).length === 1;
}

