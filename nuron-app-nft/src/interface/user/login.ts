/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  email: string;
  password: string;
  recaptcha: string;
}

export interface LoginPhoneParams {
  phone?: string;
  otp?: string;
}

export interface SignupParams {
  email: string;
  // phone: string;
  userName: string;
  password: string;
  confirm_password: string;
  term: boolean;
  recaptcha: string;
}

export interface VerifyParams {
  otp: string;
}

export interface LoginResult {
  token: string;
  username: string;
  role: Role;
}

export interface ForgotPasswordPhoneParams {
  phone: string;
  password: string;
  confirm_password: string;
  otp: string;
}

export interface ForgotChangePasswordParams {
  password: string;
  confirm_password: string;
}

export interface ForgotPasswordEmailParams {
  email: string;
  recaptcha: string;
}

export interface SignupResult {
  message: string;
  verifyToken: string;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
