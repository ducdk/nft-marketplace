import { enUS_account } from './account';
import { enUS_avatorDropMenu } from './user/avatorDropMenu';
import { enUS_tagsViewDropMenu } from './user/tagsViewDropMenu';
import { enUS_title } from './user/title';
import { enUS_globalTips } from './global/tips';
import { enUS_dashboard } from './dashboard';
import { enUS_login } from './auth/login';
import { enUS_signup } from './auth/signup';
import { enUS_information } from './information';

const en_US = {
  ...enUS_account,
  ...enUS_avatorDropMenu,
  ...enUS_tagsViewDropMenu,
  ...enUS_title,
  ...enUS_globalTips,
  ...enUS_login,
  ...enUS_signup,
  ...enUS_dashboard,
  ...enUS_information
};

export default en_US;
