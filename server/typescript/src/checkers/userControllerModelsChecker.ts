import { 
  UserRegisterRequest, 
  UserLoginRequest, 
  UserFindRequest, 
  FindByEmailRequest, 
  UserRandomRequest, 
  UserUpdateRequest,
  UserPhoneRequest
} from "../models/userControllerModels";

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


export function isUserFindByEmailRequest(obj: any): obj is FindByEmailRequest {
  return obj.email !== undefined && Object.keys(obj).length === 1;
}

export function isUserRandomRequest(obj: any): obj is UserRandomRequest {
  return obj.count !== undefined && Object.keys(obj).length === 1;
}

export function isUserUpdateRequest(obj: any): obj is UserUpdateRequest {
  return obj.email !== undefined && obj.firstName !== undefined && obj.lastName !== undefined &&
  obj.description !== undefined && obj.genderIdentity !== undefined && obj.genderPreferences !== undefined 
  && obj.userId !== undefined && Object.keys(obj).length === 7;
}

export function isUserPhoneRequest(obj: any): obj is UserPhoneRequest {
  return obj.phoneNumber !== undefined && Object.keys(obj).length === 1;
}