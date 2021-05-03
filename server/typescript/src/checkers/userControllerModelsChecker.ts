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
  obj.genderIdentity!==undefined &&
  obj.maleGenderPref !== undefined &&
  obj.femaleGenderPref !== undefined &&
  obj.otherGenderPref!== undefined &&
  Object.keys(obj).length === 9;
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
  obj.description !== undefined && obj.genderIdentity !== undefined && obj.maleGenderPref !== undefined 
  && obj.femaleGenderPref !== undefined && obj.otherGenderPref !== undefined 
  && obj.userId !== undefined && Object.keys(obj).length === 9;
}

export function isUserPhoneRequest(obj: any): obj is UserPhoneRequest {
  return obj.phoneNumber !== undefined && Object.keys(obj).length === 1;
}