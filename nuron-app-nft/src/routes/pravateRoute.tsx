import { FC } from 'react';
// eslint-disable-next-line
import { Route, useNavigate, Navigate } from 'react-router-dom';
// import { Result, Button } from 'antd';
// import { useLocale } from 'locales';
import { RouteProps, useLocation } from 'react-router';
import { useAppState } from 'stores';

const PrivateRoute: FC<RouteProps> = props => {
  const { logged } = useAppState(state => state.auth);
  // const navigate = useNavigate();
  // const { formatMessage } = useLocale();
  const location = useLocation();

  return logged ? (
    <Route {...props} />
  ) : (
    // <Redirect
    //   to={{
    //     pathname: "/login",
    //     search: "?utm=your+face",
    //     state: { referrer: currentLocation }
    //   }}
    // />
    <Navigate to={`/login${'?from=' + encodeURIComponent(location.pathname)}`} />
    // <Result
    //   status="403"
    //   title="403"
    //   subTitle={formatMessage({ id: 'gloabal.tips.unauthorized' })}
    //   extra={
    //     <Button
    //       type="primary"
    //       onClick={() => navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })}
    //     >
    //       {formatMessage({ id: 'gloabal.tips.goToLogin' })}
    //     </Button>
    //   }
    // />
  );
};

export default PrivateRoute;
