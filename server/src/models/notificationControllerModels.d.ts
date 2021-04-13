declare module "notificationControllerModels";

import { MysqlError } from "mysql";

export interface Notification {
    id: number;
    uidOne: string;
    uidTwo: string;
    message: string;
}


export interface GetNotificationRequest {
    userId: string;
}

export interface AddNotificationRequest {
    uidOne: string;
    uidTwo: string;
    message: string;
}

export interface GetNotificationResponse {
    error: MysqlError | object;
    results: Notification[];
}

export interface AddNotificationResponse {
    error: MysqlError | object;
    results: Notification[];
}
