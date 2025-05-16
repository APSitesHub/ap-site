import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Login from './Login';
import Room from './Room';

function IndividualMain() {
  const [isUserLogined, setIsUserLogined] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      setIsUserLogined(true);
    }
  }, []);

  const handleLogin = values => {
    localStorage.setItem('userName', values.userName);
    localStorage.setItem('userID', nanoid(6));
    setIsUserLogined(true);
  };

  return <>{isUserLogined ? <Room /> : <Login logined={handleLogin} />}</>;
}

export default IndividualMain;
