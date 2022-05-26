import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { localeConfig } from './locales';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';
import RenderRouter from './routes';
import { useAppState } from 'stores';
import { MoralisProvider, useMoralis } from 'react-moralis';

const App: React.FC = () => {
  const { locale } = useAppState(state => state.user);

  // set the locale for the user
  // more languages options can be added here
  useEffect(() => {
    moment.locale('en');
  }, [locale]);

  /**
   * handler function that passes locale
   * information to ConfigProvider for
   * setting language across text components
   */
  const getAntdLocale = () => {
    return enUS;
  };

  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      // @ts-ignore
      enableWeb3();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
