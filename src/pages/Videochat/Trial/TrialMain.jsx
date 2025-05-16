import { nanoid } from 'nanoid';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { isRoomAdmin } from '../utils/api/isRoomAdmin';
import Login from './Login';
import Room from './Room';

function TrialMain() {
  const { id: roomID } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLogined, setIsUserLogined] = useState(false);
  const lang = roomID === '8f1364fe-9f59-4408-ba81-417a6a45ac5b' ? 'pl' : 'ua';

  const fetchRole = useCallback(async () => {
    const isAdmin = await isRoomAdmin(roomID);
    setIsAdmin(isAdmin);
    if (isAdmin) {
      setTeacherLabel();
    }
  }, [roomID]);

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      fetchRole();
    }
  }, [fetchRole]);

  const handleLogin = values => {
    localStorage.setItem('userName', values.userName);
    localStorage.setItem('userID', nanoid(6));
    fetchRole();
    setIsUserLogined(true);
  };

  const setTeacherLabel = () => {
    const userName = localStorage.getItem('userName');
    setIsUserLogined(true);

    if (!userName.endsWith('(teacher)')) {
      localStorage.setItem('userName', userName + ' (teacher)');
    }
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root');

    html.style.height = '100%';
    body.style.height = '100%';
    root.style.height = '100%';

    return () => {
      html.style.height = '';
      body.style.height = '';
      root.style.height = '';
    };
  }, []);

  return (
    <>
      {isUserLogined ? (
        <Room isAdmin={isAdmin} lang={lang} />
      ) : (
        <Login logined={handleLogin} lang={lang} />
      )}
    </>
  );
}

export default TrialMain;
