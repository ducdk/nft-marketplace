import { Link } from 'react-router-dom';

const ComingSoonPage: React.FC<{}> = () => {
  return (
    <div className="_comming flex flex-col h-screen items-center justify-center">
      <div className="_comming-title">COMING SOON</div>
      <div className="_comming-content">will be coming soon.</div>
      <div className="_comming-content">We are working hard for your best experience, be patient</div>
      <Link to={'/'} className="_comming-backtohome outline-none text-white">
        Homepage
      </Link>
    </div>
  );
};

export default ComingSoonPage;
