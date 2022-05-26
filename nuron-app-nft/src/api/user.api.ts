import { request } from './request';
import { LoginParams, SignupParams, VerifyParams, LoginPhoneParams } from '../interface/user/login';
import { AxiosRequestConfig } from 'axios';

export const apiLogin = (data: LoginParams) => request<any>('post', '/v1/auth/login/credential', data);

export const apiLoginPhone = (data: LoginPhoneParams) => request<any>('post', '/v1/auth/login/phone', data);

export const apiVerifyOtpLogin = (data: LoginPhoneParams, config: AxiosRequestConfig) =>
  request<any>('post', '/v1/auth/login/verify', data, config);

export const apiSignup = (data: SignupParams) => request<any>('post', '/v1/auth/register', data);

export const apiVerifyOtpSignup = (data: VerifyParams, config: AxiosRequestConfig) =>
  request<any>('post', '/v1/auth/register/verify', data, config);

export const apiForgotPasswordPhone = (data: any) =>
  request<any>('post', '/v1/auth/forgot-password?method=phone', data);

export const apiForgotPasswordEmail = (data: any) =>
  request<any>('post', '/v1/auth/forgot-password?method=email', data);

export const apiForgotPasswordVerify = (data: any, config: AxiosRequestConfig) =>
  request<any>('post', '/v1/auth/reset-password?method=phone', data, config);

export const apiForgotPasswordVerifyEmail = (data: any, config: AxiosRequestConfig) =>
  request<any>('post', '/v1/auth/reset-password?method=email', data, config);

export const apiResendOtp = (data: any, config: AxiosRequestConfig) =>
  request<any>('post', '/v1/verify/resend-otp', data, config);

export const apiLogout = (config: AxiosRequestConfig) => request<any>('post', '/v1/auth/logout', {}, config);

export const apiUserInfo = (config: AxiosRequestConfig) => request<any>('get', '/v1/user/info', {}, config);
export const apiVisitorInfo = (config: AxiosRequestConfig) => request<any>('get', '/v1/visitor/info', {}, config);
export const apiCommunity = (config: AxiosRequestConfig) => request<any>('get', '/v1/community/channels', {}, config);
export const apiFAQ = (config: AxiosRequestConfig) => request<any>('get', '/v1/faqs', {}, config);

export const apiLuckyWheel = (config: AxiosRequestConfig) => request<any>('get', '/v1/luckywheel', {}, config);
export const apiLuckyWheelPlay = (data: any, config: AxiosRequestConfig) =>
  request<any>('post', '/v1/luckywheel', data, config);

export const apiNotification = (data: any, config: AxiosRequestConfig) =>
  request<any>('post', '/v1/notifications/user/history', data, config);
export const apiReadNotification = (notificationId: string, config: AxiosRequestConfig) =>
  request<any>('post', `/v1/notifications/user/${notificationId}`, notificationId, config);
export const apiUnreadNotification = (config: AxiosRequestConfig) =>
  request<any>('get', '/v1/notifications/user/unread_count', {}, config);

export const apiUpdateInfo = (data: any, config: AxiosRequestConfig) =>
  request<any>('put', '/v1/user/info', data, config);
export const apiUpdateInfoSensitive = (data: any, config: AxiosRequestConfig) =>
  request<any>('put', '/v1/user/info/sensitive', data, config);
