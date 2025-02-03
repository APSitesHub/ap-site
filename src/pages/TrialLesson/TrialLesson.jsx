import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const TrialLesson = () => {
  const { crmId, language } = useParams();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const lvl = queryParams.get('lvl');
    const age = queryParams.get('age');

    const fetchData = async () => {
      if (!crmId) {
        const previousUrl = localStorage.getItem('previousUrl');
        if (previousUrl) {
          window.location.href = previousUrl;
        }
        return;
      } else {
        localStorage.removeItem('previousUrl');
      }

      try {
        const response = await axios.get(`https://14b7-5-59-198-77.ngrok-free.app/trial-lesson/${crmId}?language=${language}&lvl=${lvl}&age=${age}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });

        if (response.data.link) {
          localStorage.setItem('previousUrl', window.location.href);
          setLink(response.data.link);
        } else {
          setMessage(response.data.message || 'Упс, щось пішло не так. Зв\'яжіться з нашим менеджером.');
        }
      } catch (error) {
        setMessage('Упс, щось пішло не так. Зв\'яжіться з нашим менеджером.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [crmId, language, location.search]);

  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      {loading ? <h1>Зачекайте, шукаємо ваше посилання...</h1> : <h1>{message}</h1>}
      {link && <button onClick={handleClick}>Доєднатись до зум конференції</button>}
    </div>
  );
};

export default TrialLesson;
