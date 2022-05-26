import { User } from './../interface/user/user';
import { apiResendOtp, apiUpdateInfo, apiUpdateInfoSensitive } from './../api/user.api';
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { apiCommunity, apiFAQ, apiLuckyWheel, apiLuckyWheelPlay, apiUserInfo, apiVisitorInfo } from 'api/user.api';
import { Role } from 'interface/user/login';
import { Locale, UserState } from 'interface/user/user';
import { WIDTH_MOBILE, WIDTH_TAB } from 'utils/getGloabal';
import { message as $message } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { setItem } from './auth.store';
import { METHOD } from 'utils/const';

const initialState: UserState = {
  // ...getGlobalState(),
  device: /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'MOBILE' : 'DESKTOP',
  collapsed: window.innerWidth <= WIDTH_TAB,
  showSocial: window.innerWidth <= WIDTH_MOBILE,
  isPageHome: window.location.href === window.location.origin + '/' ? true : false,
  noticeCount: 0,
  locale: (localStorage.getItem('locale')! || 'en_US') as Locale,
  menuList: [],
  dataAnchor: '',
  userName: localStorage.getItem('username') || '',
  webview: JSON.parse(localStorage.getItem('webview')!) || {},
  role: (localStorage.getItem('username') || '') as Role,
  user: {},
  visitor: {},
  dataInfoBit: [],
  verifyToken: '',
  scroll: '',
  authSendCode: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    }
  }
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;

export const webViewAsync = (logged: boolean, accessToken: string) => {
  return async (dispatch: Dispatch) => {
    let __next_data = document.getElementById('__NEXT_DATA__');
    console.log(__next_data);

    let json = JSON.parse(__next_data ? __next_data?.innerHTML : '');

    dispatch(
      setUserItem({
        webview: json
      })
    );
    return json;
  };
};

export const visitorInfoAsync = (pubblicGameTokenKey?: string, distinctId?: string) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        public_game_token_key: pubblicGameTokenKey,
        distinct_id: distinctId
      }
    };
    console.log(config);
    return await apiVisitorInfo(config)
      .then(
        response => {
          dispatch(
            setUserItem({
              visitor: response.data
            })
          );
          return response.data;
        },
        error => {
          // if (error.response.status) {
          //   $message.error(error.response.data.status.message);
          // } else {
          //   $message.error(error.status.message);
          // }
          return false;
        }
      )
      .catch(error => {
        // $message.error(error.message);
        return false;
      });
  };
};

export const communityAsync = (pubblicGameTokenKey?: string, distinctId?: string) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        public_game_token_key: pubblicGameTokenKey,
        distinct_id: distinctId
      }
    };
    console.log(config);
    return await apiCommunity(config)
      .then(
        response => {
          dispatch(
            setUserItem({
              visitor: response.data
            })
          );
          return response.data;
        },
        error => {
          // if (error.response.status) {
          //   $message.error(error.response.data.status.message);
          // } else {
          //   $message.error(error.status.message);
          // }
          return false;
        }
      )
      .catch(error => {
        // $message.error(error.message);
        return false;
      });
  };
};

export const faqAsync = (pubblicGameTokenKey?: string, distinctId?: string) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        // public_game_token_key: pubblicGameTokenKey,
        // distinct_id: distinctId
      }
    };
    return await apiFAQ(config)
      .then(
        response => {
          dispatch(
            setUserItem({
              visitor: response.data
            })
          );
          return response.data;
        },
        error => {
          return false;
        }
      )
      .catch(error => {
        // $message.error(error.message);
        return false;
      });
  };
};

export const userInfoAsync = (pubblicGameTokenKey?: string, distinctId?: string, token?: string) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        // public_game_token_key: pubblicGameTokenKey,
        // distinct_id: distinctId,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    return await apiUserInfo(config)
      .then(
        response => {
          dispatch(
            setUserItem({
              user: response.data
            })
          );
          return response.data;
        },
        error => {
          // if (error.response.status) {
          //   $message.error(error.response.data.status.message);
          // } else {
          //   $message.error(error.status.message);
          // }
          return false;
        }
      )
      .catch(error => {
        // $message.error(error.message);
        return false;
      });
  };
};

export const luckyWheelAsync = (token?: string) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    return await apiLuckyWheel(config)
      .then(
        response => {
          return response.data;
        },
        error => {
          return false;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const luckyWheelPlayAsync = (data: any, token?: string) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    return await apiLuckyWheelPlay(data, config)
      .then(
        response => {
          return response.data;
        },
        error => {
          return error.response;
        }
      )
      .catch(error => {
        // $message.error(error.message);
        return false;
      });
  };
};

export const changeUserInfoAsync = (method: string, data: any, user?: User, token?: string) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    return await apiUpdateInfo(data, config)
      .then(
        response => {
          switch (method) {
            case METHOD.BASIC_INFO:
              dispatch(setUserItem({ user: { ...user, userName: data.get('newUsername') } }));
              break;
            case METHOD.EMAIL:
              dispatch(
                setUserItem({
                  verifyToken: response.data.verifyToken,
                  authSendCode: true
                })
              );
              break;
            case METHOD.PHONE:
              dispatch(
                setUserItem({
                  verifyToken: response.data.verifyToken,
                  authSendCode: true
                })
              );
              break;
            case METHOD.PASSWORD:
              dispatch(
                setUserItem({
                  verifyToken: response.data.verifyToken,
                  authSendCode: true
                })
              );
              break;
          }
          return response.data;
        },
        error => {
          return error.response.data;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const resendOtpUserInfoAsync = (method: string, token?: string) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        verify_token: token,
        'Content-Type': 'application/json'
      }
    };
    const payload = {
      method: method
    };

    return await apiResendOtp(payload, config)
      .then(
        response => {
          dispatch(
            setUserItem({
              authSendCode: true
            })
          );
          return response.data;
        },
        error => {
          return error.response.data;
        }
      )
      .catch(error => {
        $message.error(error.message);
        return false;
      });
  };
};

export const changeUserInfoSensitiveAsync = (
  method: string,
  data: any,
  user?: User,
  token?: string,
  verify_token?: string
) => {
  return async (dispatch: Dispatch) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        verify_token: verify_token
      }
    };
    return await apiUpdateInfoSensitive(data, config)
      .then(
        response => {
          switch (method) {
            case METHOD.EMAIL:
              dispatch(
                setUserItem({
                  user: {},
                  authSendCode: false
                })
              );
              dispatch(
                setItem({
                  logged: false,
                  accessToken: ''
                })
              );
              $message.success('Change email successfully. Please login again!');
              localStorage.clear();
              break;
            case METHOD.PHONE:
              dispatch(
                setUserItem({
                  user: { ...user, phone: data.newPhone },
                  authSendCode: false
                })
              );
              break;
            case METHOD.PASSWORD:
              dispatch(
                setUserItem({
                  user: {},
                  authSendCode: false
                })
              );
              dispatch(
                setItem({
                  logged: false,
                  accessToken: ''
                })
              );
              $message.success('Change password successfully. Please login again!');
              localStorage.clear();
            // $message.success(SUCCESS_MESSAGE);
          }
          return response.data;
        },
        error => {
          dispatch(
            setUserItem({
              authSendCode: true
            })
          );
          return error.response.data;
        }
      )
      .catch(error => {
        dispatch(
          setUserItem({
            authSendCode: true
          })
        );
        $message.error(error.message);
        return false;
      });
  };
};
