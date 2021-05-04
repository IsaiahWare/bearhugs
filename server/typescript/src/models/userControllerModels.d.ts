declare module "userControllerModels";

import { MysqlError } from "mysql";

export interface User {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    description: object;
    genderIdentity: string;
    maleGenderPref: boolean;
    femaleGenderPref: boolean;
    otherGenderPref: boolean;

}

export interface UserResetPasswordRequest {
    userId: string;
    newPassword: string;

}



export interface UserRegisterRequest {
   email: string;
   password: string;
   firstName: string;
   lastName: string;
   age: number;
   maleGenderPref: boolean;
   femaleGenderPref: boolean;
   otherGenderPref: boolean;
}

export interface UserLoginRequest {
   email: string;
   password: string;
}
export interface FindByEmailRequest {
    email: string
}

export interface UserFindRequest {
   userId: string;
}

export interface UserRandomRequest {
   count: number; 
}

export interface UserUpdateRequest {
    email: string;
    firstName: string;
    lastName: string;
    description: string;
    genderIdentity: string;
    maleGenderPref: boolean;
    femaleGenderPref: boolean;
    otherGenderPref: boolean;
    userId: number;
}

export interface UserPhoneRequest {
    phoneNumber: string; 
 }

export interface FindByEmailResponse {
    error: MysqlError | Error | object;
    results: User[]
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

export interface UserRandomResponse {
    error: MysqlError | Error | object;
    results: User[]
}
