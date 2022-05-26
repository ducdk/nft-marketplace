import { FC, useEffect, Suspense, useState, Fragment } from 'react';
import HeaderComponent from './header';
import { WIDTH_MOBILE, WIDTH_TAB } from 'utils/getGloabal';
import { Outlet } from 'react-router';
import { setUserItem } from 'stores/user.store';
import { useAppDispatch, useAppState } from 'stores';
import LoadingSpinner from 'components/loading-spinner';
import FooterComponent from './footer';

const LayoutPage: FC = () => {
  const { collapsed, isPageHome } = useAppState(state => state.user);
  const [scroll, setScroll] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener('resize', () => {
      // const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width <= WIDTH_TAB;
      const needShowSocial = rect.width < WIDTH_MOBILE;
      dispatch(
        setUserItem({
          collapsed: needCollapse,
          showSocial: needShowSocial
        })
      );
    });
  }, [dispatch]);

  useEffect(() => {
    let pageWrapper = document.getElementById('page-wrapper');
    if (pageWrapper) {
      pageWrapper.addEventListener('scroll', (event: any) => {
        // console.log(event);
        if (!!pageWrapper && pageWrapper?.scrollTop > window.innerHeight * 0.75) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      });
    }
  }, []);

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <HeaderComponent collapsed={collapsed} />
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
        <FooterComponent collapsed={collapsed} />
      </Suspense>
    </>
  );
};

export default LayoutPage;
