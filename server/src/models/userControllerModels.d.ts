declare module "userControllerModels";

import { MysqlError } from "mysql";

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

export interface UserRegisterRequest {
   email: string;
   password: string;
   firstName: string;
   lastName: string;
}

export interface UserLoginRequest {
   email: string;
   password: string;
}

export interface UserFindRequest {
   id: string;
}

export interface UserRegisterResponse {
    error: MysqlError | object;
    results: object[];
}

export interface UserLoginResponse {
    error: MysqlError | Error | object;
    results: User[];
}

export interface UserFindResponse {
    error: MysqlError | Error | object;
    results: User[]
}
