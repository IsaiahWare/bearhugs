import { UserRegisterRequest, UserLoginRequest, UserFindRequest  } from "../models/userControllerModels";

export function isUserRegisterRequest(obj: any): obj is UserRegisterRequest {
  return obj.email !== undefined &&
  obj.password !== undefined &&
  obj.firstName !== undefined &&
  obj.lastName !== undefined &&
  Object.keys(obj).length === 4;
}

export function isUserLoginRequest(obj: any): obj is UserLoginRequest {
  return obj.email !== undefined &&
  obj.password !== undefined &&
  Object.keys(obj).length === 2;
}

export function isUserFindRequest(obj: any): obj is UserFindRequest {
  return obj.id !== undefined && Object.keys(obj).length === 1;
}

