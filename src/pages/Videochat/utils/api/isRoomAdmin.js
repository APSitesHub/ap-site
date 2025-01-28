import { getToken } from "./getToken";
import axios from 'axios';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3001';

export const isRoomAdmin = async (roomId) => {
  try {
    const response = await axios.get(`/rooms/isRoomAdmin?id=${roomId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data.isRoomAdmin;
  } catch (error) {
    console.error('Error determining user role:', error);
  }
};