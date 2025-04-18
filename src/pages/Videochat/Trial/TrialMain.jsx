import Room from './Room';
import Login from './Login';
import { useEffect, useState } from 'react';
import { isRoomAdmin } from '../utils/api/isRoomAdmin';
import { useParams } from 'react-router-dom';

function TrialMain() {
  const { id: roomID } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLogined, setIsUserLogined] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      fetchRole();
    }
  }, []);

  const handleLogin = values => {
    localStorage.setItem('userName', values.userName);
    fetchRole();
  };

  const fetchRole = async () => {
    const isAdmin = await isRoomAdmin(roomID);
    setIsAdmin(isAdmin);
    setIsUserLogined(true);
  };

  return <>{isUserLogined ? <Room isAdmin={isAdmin} /> : <Login logined={handleLogin} />}</>;
}

export default TrialMain;
