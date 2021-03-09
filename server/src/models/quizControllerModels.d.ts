declare module "quizControllerModels";

import { MysqlError } from "mysql";

export interface SendQuizResultsRequest {
    id: number;
    quizResults: object;
}

export interface SendQuizResultsResponse {
    error: MysqlError | object;
    results: object[];
}

export interface FindQuizResultsRequest {
    userId: number;
}

export interface FindQuizResultsResponse {
    error: MysqlError | object;
    results: object[];
}

