declare module "notificationControllerModels";

import { MysqlError } from "mysql";

export interface Notification {
    id: number;
    userId1: string;
    userId2: string;
    userId3: string;
    message: string;
}


export interface GetNotificationRequest {
    userId: string;
}

export interface AddTwoNotificationRequest {
    userId1: string;
    userId2: string;
    message: string;
}

export interface AddTwoNotificationResponse {
    error: MysqlError | object;
    results: Notification[];
}


export interface GetNotificationResponse {
    error: MysqlError | object;
    results: Notification[];
}

export interface AddThreeNotificationRequest {
    userId1: string;
    userId2: string;
    userId3: string;
    message: string;
}

export interface AddThreeNotificationResponse {
    error: MysqlError | object;
    results: Notification[];
}
