import { FC } from 'react';
import './index.less';
import { ReactComponent as Loading } from 'assets/logo/loading.svg';

interface LoadingProps {
  showFull?: false | boolean;
}

const LoadingData: FC<LoadingProps> = (props: LoadingProps) => {
  return (
    <div
      className={`loading  ${props.showFull ? 'h-full' : 'min-h-loading'} w-full flex items-center justify-center z-50`}
    >
      <Loading className="loading-page w-6 h-6" />
    </div>
  );
};

export default LoadingData;
