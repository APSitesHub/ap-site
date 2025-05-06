import Room from './Room';
import Login from './Login';
import { useEffect, useState } from 'react';
import { isRoomAdmin } from '../utils/api/isRoomAdmin';
import { useParams } from 'react-router-dom';

function TrialMain() {
  const { id: roomID } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLogined, setIsUserLogined] = useState(false);
  const lang = roomID === '8f1364fe-9f59-4408-ba81-417a6a45ac5b' ? 'pl' : 'ua';

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      fetchRole();
    }
  }, []);

  const handleLogin = values => {
    localStorage.setItem('userName', values.userName);
    fetchRole();
  };

  const setTeacherLabel = () => {
    const userName = localStorage.getItem('userName');

    if (!userName.endsWith('(teacher)')) {
      localStorage.setItem('userName', userName + ' (teacher)');
    }
  };

  const fetchRole = async () => {
    const isAdmin = await isRoomAdmin(roomID);
    setIsAdmin(isAdmin);
    setIsUserLogined(true);
    isAdmin && setTeacherLabel();
  };

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
