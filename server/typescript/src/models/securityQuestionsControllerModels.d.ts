declare module "securityQuestionsControllerModels";

export interface SecurityQuestionsSendRequest {
    email: string;
    securityQuestions: object;
}
export interface SecurityQuestionsGetRequest {
    email: string;
}