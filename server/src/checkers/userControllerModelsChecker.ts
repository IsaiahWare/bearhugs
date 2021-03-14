import { UserRegisterRequest, UserLoginRequest, UserFindRequest  } from "../models/userControllerModels";

export function isUserRegisterRequest(obj: any): obj is UserRegisterRequest {
  return obj.email !== undefined &&
  obj.password !== undefined &&
  obj.firstName !== undefined &&
  obj.lastName !== undefined &&
  obj.age !== undefined &&
  Object.keys(obj).length === 5;
}

export function isUserLoginRequest(obj: any): obj is UserLoginRequest {
  return obj.email !== undefined &&
  obj.password !== undefined &&
  Object.keys(obj).length === 2;
}

export function isUserFindRequest(obj: any): obj is UserFindRequest {
  return obj.userId !== undefined && Object.keys(obj).length === 1;
}

