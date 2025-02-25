import axios from 'axios';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3001';

export const refreshToken = async () => {
  try {
    const res = await axios.post('/teachers/refresh', {
      login: localStorage.getItem('login'),
    });

    localStorage.setItem('token', res.data.newToken);
  } catch (error) {
    console.log(error);
  }
};