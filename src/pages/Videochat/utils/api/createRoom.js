import axios from 'axios';
import { getToken } from "./getToken";

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3001';

export const createRoom = async (name) => {
  const options = {
    name,
  };

  try {
    await axios.post('/rooms/create', options, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

  } catch (error) {
    console.error("Error creating room:", error.response?.data || error.message);
  }
};