import axios from 'axios';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Page } from '../Videochat.styled';
import Room from './Room';
import Login from './Login';

function IndividualMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLogined, setIsUserLogined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const localRole = localStorage.getItem('localRole');

    const refreshTeacherToken = async () => {
      try {
        const res = await axios.post('/teachers/refresh', {
          login: localStorage.getItem('login'),
        });

        localStorage.setItem('token', res.data.newToken);
        setIsAdmin(true);
        setIsUserLogined(true);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const refreshUserToken = async () => {
      try {
        const res = await axios.post('/users/refresh', {
          mail: localStorage.getItem('mail'),
        });

        localStorage.setItem('userName', res.data.user.name);
        localStorage.setItem('token', res.data.newToken);
        setIsAdmin(false);
        setIsUserLogined(true);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsUserLogined(false);
      }
    };

    if (localRole === 'admin' || localStorage.getItem('login')?.startsWith('teacher')) {
      refreshTeacherToken();
    } else {
      refreshUserToken();
    }
  }, []);

  const handleLogin = isAdmin => {
    localStorage.setItem('localRole', isAdmin ? 'admin' : 'user');
    setIsAdmin(isAdmin);
    setIsUserLogined(true);
  };

  return (
    <Page>
      {isLoading ? (
        <ColorRing
          visible={true}
          height="120"
          width="120"
          ariaLabel="blocks-loading"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: '0 auto',
          }}
          wrapperClass="blocks-wrapper"
          colors={['#0f645b', '#0f645b', '#0f645b', '#0f645b', '#0f645b']}
        />
      ) : isUserLogined ? (
        <Room isAdmin={isAdmin} />
      ) : (
        <Login logined={handleLogin} />
      )}
    </Page>
  );
}

export default IndividualMain;
