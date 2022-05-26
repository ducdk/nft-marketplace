import { mock, intercepter } from '../config';
import { LoginResult, Role } from 'interface/user/login';

mock.mock('/user/login', 'post', (config: any) => {
  const body: LoginResult = JSON.parse(config?.body);
  return intercepter<LoginResult>({
    token: '123abcdefg',
    username: 'mockuser',
    role: body?.username as Role
  });
});

mock.mock('/user/signup', 'post', (config: any) => {
  return intercepter<any>({
    status: true
  });
});
