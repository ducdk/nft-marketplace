import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import {
  apiForgotPasswordEmail,
  apiForgotPasswordPhone,
  apiForgotPasswordVerify,
  apiForgotPasswordVerifyEmail,
  apiLogin,
  apiLoginPhone,
  apiLogout,
  apiResendOtp,
  apiSignup,
  apiVerifyOtpLogin,
  apiVerifyOtpSignup
} from 'api/user.api';
import { LoginParams, SignupParams, VerifyParams, LoginPhoneParams } from 'interface/user/login';
import { AuthObject } from 'interface/user/user';
import { message as $message } from 'antd';
import { AxiosRequestConfig } from 'axios';

const initialState: AuthObject = {
  authVerifyLogin: false,
  tokenVerifyLogin: '',
  authVerifyRegister: false,
  tokenVerifyRegister: '',
  authVerifyForgot: false,
  tokenVerifyForgot: '',
  methodForgot: '',
  logged: localStorage.getItem('token') ? true : false,
  accessToken: localStorage.getItem('token') ? (localStorage.getItem('token') as string) : '',
  authWith: 'credential'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<Partial<AuthObject>>) {
      Object.assign(state, action.payload);
    }
  }
});

export const { setItem } = authSlice.actions;

export default authSlice.reducer;

const saveAccessToken = (dispatch: Dispatch, token: any) => {
  localStorage.setItem('token', token);
  dispatch(
    setItem({
      tokenVerifyLogin: '',
      authVerifyLogin: false,
      logged: true,
      accessToken: token
    })
  );
};

export const loginAsync = (payload: LoginParams) => {
  return async (dispatch: Dispatch) => {
    return await apiLogin(payload)
      .then(
        response => {
          saveAccessToken(dispatch, response.data['accessToken']);
          return true;
        },
        error => {
          // console.log(error.response);
          // if (error.response.status) {
          //   $message.error(error.response.data.status.message);
          // } else {
          //   $message.error(error.status.message);
          // }
          return false;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const loginPhoneAsync = (payload: LoginPhoneParams) => {
  return async (dispatch: Dispatch) => {
    return await apiLoginPhone(payload)
      .then(
        response => {
          dispatch(
            setItem({
              tokenVerifyLogin: response.data['verifyToken'],
              authVerifyLogin: true
            })
          );
          return true;
        },
        error => {
          // console.log(error.response);
          // if (error.response.status) {
          //   $message.error(error.response.data.status.message);
          // } else {
          //   $message.error(error.status.message);
          // }
          return false;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const signupAsync = (payload: SignupParams) => {
  return async (dispatch: Dispatch) => {
    return await apiSignup(payload)
      .then(
        response => {
          dispatch(
            setItem({
              tokenVerifyRegister: response.data['verifyToken'],
              authVerifyRegister: true
            })
          );
          return true;
        },
        error => {
          console.log(error.response.data);
          // if (error.response.status) {
          //   $message.error(error.response.data.status.message);
          // } else {
          //   $message.error(error.status.message);
          // }
          return error.response.data;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const verifySignupAsync = (payload: VerifyParams, tokenVerify: any) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: { verify_token: tokenVerify }
    };
    return await apiVerifyOtpSignup(payload, config)
      .then(
        response => {
          saveAccessToken(dispatch, response.data['accessToken']);
          dispatch(
            setItem({
              tokenVerifyRegister: '',
              authVerifyRegister: false
            })
          );
          return true;
        },
        error => {
          // $message.error(error.message);
          return error.response.data;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const forgotPasswordPhoneAsync = (payload: any) => {
  return async (dispatch: Dispatch) => {
    return await apiForgotPasswordPhone(payload)
      .then(
        response => {
          dispatch(
            setItem({
              tokenVerifyForgot: response.data['verifyToken'],
              authVerifyForgot: true
            })
          );
          return true;
        },
        error => {
          // $message.error(error.message);
          return error.response.data;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const forgotPasswordEmailAsync = (payload: any) => {
  return async (dispatch: Dispatch) => {
    return await apiForgotPasswordEmail(payload)
      .then(
        response => {
          return true;
        },
        error => {
          // $message.error(error.message);
          return error.response.data;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const forgotPasswordVerifyAsync = (payload: any, tokenVerify: any) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: { verify_token: tokenVerify }
    };
    return await apiForgotPasswordVerify(payload, config)
      .then(
        response => {
          dispatch(
            setItem({
              tokenVerifyForgot: '',
              authVerifyForgot: false
            })
          );
          return true;
        },
        error => {
          // $message.error(error.message);
          return error.response.data;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const forgotPasswordVerifyEmailAsync = (payload: any, tokenVerify: any) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: { verify_token: tokenVerify }
    };
    return await apiForgotPasswordVerifyEmail(payload, config)
      .then(
        response => {
          dispatch(
            setItem({
              accessToken: '',
              logged: false
            })
          );
          return true;
        },
        error => {
          // $message.error(error.message);
          return error.response.data;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const verifyLoginAsync = (payload: LoginPhoneParams, tokenVerify: any) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: { verify_token: tokenVerify }
    };
    return await apiVerifyOtpLogin(payload, config)
      .then(
        response => {
          saveAccessToken(dispatch, response.data['accessToken']);
          return true;
        },
        error => {
          // $message.error(error.message);
          return false;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const logoutAsync = (token: any) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return await apiLogout(config)
      .then(
        response => {
          dispatch(
            setItem({
              tokenVerifyLogin: '',
              authVerifyLogin: false,
              logged: false,
              accessToken: ''
            })
          );
          localStorage.clear();
          return true;
        },
        error => {
          dispatch(
            setItem({
              tokenVerifyLogin: '',
              authVerifyLogin: false,
              logged: false,
              accessToken: ''
            })
          );
          localStorage.clear();
          // $message.error(error.message);
          return false;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const resendOtpAsync = (method: string, tokenVerify: any) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        verify_token: tokenVerify
      }
    };
    const payload = {
      method: method
    };
    return await apiResendOtp(payload, config)
      .then(
        response => {
          return true;
        },
        error => {
          // $message.error(error.message);
          return false;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};
