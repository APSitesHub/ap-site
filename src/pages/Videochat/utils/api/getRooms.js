import axios from 'axios';
import { getToken } from './getToken';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3001';

export const getRooms = async () => {
  try {
    const response = await axios.get('/rooms/byTeacher', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error.response?.data || error.message);
  }
};
