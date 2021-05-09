import { 
  UserRegisterRequest, 
  UserLoginRequest, 
  UserFindRequest, 
  FindByEmailRequest, 
  UserRandomRequest, 
  UserUpdateRequest,
  UserPhoneRequest,
  UserResetPasswordRequest
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
  obj.phoneNumber!==undefined &&
  Object.keys(obj).length === 10;
}

export function isUserLoginRequest(obj: any): obj is UserLoginRequest {
  return obj.email !== undefined &&
  obj.password !== undefined &&
  Object.keys(obj).length === 2;
}

export function isUserFindRequest(obj: any): obj is UserFindRequest {
  return obj.userId !== undefined && Object.keys(obj).length === 1;
}

export function isUserResetPasswordRequest(obj: any): obj is UserResetPasswordRequest {
  return obj.userId !== undefined && obj.newPassword!==undefined && obj.oldPassword!==undefined && Object.keys(obj).length === 3;
}


export function isUserFindByEmailRequest(obj: any): obj is FindByEmailRequest {
  return obj.email !== undefined && Object.keys(obj).length === 1;
}

export function isUserRandomRequest(obj: any): obj is UserRandomRequest {
  return obj.count !== undefined && Object.keys(obj).length === 1;
}

export function isUserUpdateRequest(obj: any): obj is UserUpdateRequest {
  return obj.email !== undefined 
  && obj.description !== undefined 
  && obj.genderIdentity !== undefined && obj.maleGenderPref !== undefined 
  && obj.femaleGenderPref !== undefined && obj.otherGenderPref !== undefined 
  && obj.userId !== undefined && Object.keys(obj).length === 7;
}

export function isUserPhoneRequest(obj: any): obj is UserPhoneRequest {
  return obj.phoneNumber !== undefined && Object.keys(obj).length === 1;
}