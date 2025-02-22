import { Button } from '@mui/material';
import './NotFoundPage.scss';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFoundPage = () => {

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const goBack = (e: any) => {
    e.preventDefault();
    navigate(-1);
  }
    
  return (
    <div className='not-found' data-testid="notfound">

      <Helmet>
        <title>Page Not Found - IruSri Assignment</title>
        <meta
            name="description"
            content="The page you're looking for might have been removed, had its name changed, or is temporarily unavailable."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Page Not Found - CoverageX Assignment" />
        <meta
            property="og:description"
            content="We couldn't find the page you were looking for. Explore our homepage or use the search bar to find what you need."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="not-found-inner">
        <div className="badge">
          <h5 className="error-text">404 error</h5>
        </div>
        <h1 className="header">We've lost this page</h1>
        <h5 className="subheader">Sorry, the page you are looking for doesn't exist or has been moved</h5>
        <Button variant="contained" size="small" className='control-button' onClick={goBack}>Back</Button>
      </div>
    </div>
  );

}

export default NotFoundPage;