declare module "friendControllerModels";

import { MysqlError } from "mysql";
import { User } from "./userControllerModels";

export interface UserFriendFindRequest {
    userId: number;
}

export interface UserFriendFindResponse {
    error: {},
    results: User[]
}
