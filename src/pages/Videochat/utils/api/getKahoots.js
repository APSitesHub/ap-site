import axios from 'axios';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3001';

export const getKahoots = async () => {
  try {
    const response = await axios.get('/kahoots/all', {});
    const kahootsNames = Object.keys(response.data[0]);

    return kahootsNames.filter(
      kahootName =>
        kahootName !== 'createdAt' && kahootName !== 'updatedAt' && kahootName !== '_id'
    );
  } catch (error) {
    console.error('Error fetching kahoots:', error.response?.data || error.message);
  }
};
