import axios from 'axios';
import { TeacherPageSection } from 'pages/TeacherPage/TeacherPage.styled';
import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';

axios.defaults.baseURL = 'https://aggregator-server.onrender.com';

const Teacher = () => {
  const wakeupRequest = async () => {
    try {
      const wake = await axios.get('/');
      console.log(wake.data);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    wakeupRequest();
  }, []);

  return (
    <TeacherPageSection>
      <Outlet />
    </TeacherPageSection>
  );
};

export default Teacher;
