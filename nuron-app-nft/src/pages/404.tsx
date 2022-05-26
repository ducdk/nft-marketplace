import { Link } from 'react-router-dom';

const NotFoundPage: React.FC<{}> = () => {
  return (
    <div className="rn-not-found-area rn-section-gapTop">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="rn-not-found-wrapper">
              <h2 className="large-title">404</h2>
              <h3 className="title">Page not found!</h3>
              <p>The page you are looking for not available.</p>
              <a href="/" className="btn btn-primary btn-large">
                Go Back To Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
