import Room from './Room';
import Login from './Login';
import { useEffect, useState } from 'react';

function IndividualMain() {
  const [isUserLogined, setIsUserLogined] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      setIsUserLogined(true);
    }
  }, []);

  const handleLogin = values => {
    localStorage.setItem('userName', values.userName);
    setIsUserLogined(true);
  };

  return <>{isUserLogined ? <Room /> : <Login logined={handleLogin} />}</>;
}

export default IndividualMain;
