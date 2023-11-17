import { Link } from 'react-router-dom';

import './notFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <div className="content">
        <h1>404</h1>
        <h2>OPPS! PAGE NOT FOUND</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
