import { FC, Suspense } from 'react';
import { Outlet } from 'react-router';
import LoadingSpinner from 'components/loading-spinner';

const ExploreWrapperPage: FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
};

export default ExploreWrapperPage;
