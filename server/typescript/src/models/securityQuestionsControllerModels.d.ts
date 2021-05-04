declare module "securityQuestionsControllerModels";

export interface SecurityQuestionsSendRequest {
    userId: number;
    securityQuestions: object;
}
export interface SecurityQuestionsGetRequest {
    userId: number;
}