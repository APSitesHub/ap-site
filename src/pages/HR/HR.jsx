import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Outlet, useLocation } from 'react-router-dom';
import { HRNav } from './HRNav/HRNav';

axios.defaults.baseURL = 'https://aggregator-server.onrender.com';

const HR = () => {
  let location = useLocation();

  return (
    <>
      <StreamsBackgroundWrapper>
        {location.pathname === '/hr' ||
        location.pathname === '/hr/' ? (
          <HRNav/>
        ) : (
          <Outlet />
        )}
      </StreamsBackgroundWrapper>
    </>
  );
};

export default HR;
