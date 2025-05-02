import Room from './Room';
import Login from './Login';
import { useEffect, useState } from 'react';
import { isRoomAdmin } from '../utils/api/isRoomAdmin';
import { useParams } from 'react-router-dom';

function StreamMain() {
  const { id: roomID } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLogined, setIsUserLogined] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      fetchRole();
    }
  }, []);

  const handleLogin = () => {
    setIsUserLogined(true);
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
    <>{isUserLogined ? <Room isAdmin={isAdmin} /> : <Login logined={handleLogin} />}</>
  );
}

export default StreamMain;
