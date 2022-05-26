import { lazy, FC } from 'react';
import { PartialRouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';
import WrapperRouteComponent from './config';
import LayoutPage from 'pages/layout';
import ExploreWrapperPage from 'pages/explore/wrapper';

const NotFound = lazy(() => import(/* webpackChunkName: "404"*/ 'pages/404'));
const HomePage = lazy(() => import(/* webpackChunkName: ""*/ 'pages/home'));
const ConnectPage = lazy(() => import(/* webpackChunkName: ""*/ 'pages/connect'));
const ExplorePage = lazy(() => import(/* webpackChunkName: ""*/ 'pages/explore'));
const ExploreChildPage = lazy(() => import(/* webpackChunkName: ""*/ 'pages/explore/explore-child'));
const CreatePage = lazy(() => import(/* webpackChunkName: ""*/ 'pages/create'));
const ProfilePage = lazy(() => import(/* webpackChunkName: ""*/ 'pages/profile'));

const routeList: PartialRouteObject[] = [
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" description="" />,
    children: [
      {
        path: '/',
        element: <WrapperRouteComponent element={<HomePage />} titleId="title.home" description="title.des.home" />
      },
      {
        path: '/connect',
        element: <WrapperRouteComponent element={<ConnectPage />} titleId="title.home" description="title.des.home" />
      },
      {
        path: '/explore',
        element: (
          <WrapperRouteComponent element={<ExploreWrapperPage />} titleId="title.home" description="title.des.home" />
        ),
        children: [
          {
            path: '/',
            element: (
              <WrapperRouteComponent element={<ExplorePage />} titleId="title.home" description="title.des.home" />
            )
          },
          {
            path: '/:id',
            element: (
              <WrapperRouteComponent element={<ExploreChildPage />} titleId="title.home" description="title.des.home" />
            )
          }
        ]
      },
      {
        path: '/create',
        element: <WrapperRouteComponent element={<CreatePage />} titleId="title.home" description="title.des.home" />
      },
      {
        path: '/profile',
        element: <WrapperRouteComponent element={<ProfilePage />} titleId="title.home" description="title.des.home" />
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFound" description="title.des.home" />
      }
    ]
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
