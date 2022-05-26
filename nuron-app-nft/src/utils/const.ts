export const CODE_TIMER = 60;
export const SUCCESS_MESSAGE = 'Success';
export const UPDATE_USERNAME_SUCCESS_MESSAGE = 'Changed username successfully';
export const UPDATE_PHONE_SUCCESS_MESSAGE = 'Changed phone successfully';

export enum METHOD {
  BASIC_INFO = 'BASIC_INFO',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  PHONE = 'PHONE'
}

export const ERROR_MESSAGE = {
  USERNAME_NOT_CHANGED: {
    code: 2026,
    message: 'New username has no change'
  },
  PASSWORD_NOT_CHANGED: {
    code: 2025,
    message: 'New password has no change'
  },
  CURRENT_PASSWORD_WRONG: {
    code: 2015,
    message: 'Current password is wrong'
  },
  EMAIL_NOT_CHANGED: {
    code: 2027,
    message: 'New email has no change'
  }
};
