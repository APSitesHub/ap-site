import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import {TrialLessonContainer, LoadingMessage, Message, JoinButton, JoinWrapper, JoinMessage} from './TrialLesson.styled'

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
        const response = await axios.get(`https://ap-server-8qi1.onrender.com/trial-lesson/${crmId}?language=${language}&lvl=${lvl}&age=${age}`);
        if (response.data.link) {
          localStorage.setItem('previousUrl', window.location.href);
          setLink(response.data.link);
        } else {
          setMessage(response.data.message || 'Упс, щось пішло не так. Зв\'яжіться з нашим менеджером.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
    <TrialLessonContainer>
      {loading && !link ? <LoadingMessage>Зачекайте, шукаємо ваше посилання...</LoadingMessage> : <Message>{message}</Message>}
      {
        link && <JoinWrapper>
          <JoinMessage>Пробне заняття буде відбуватись у Zoom. Підготуйтесь до пробного уроку коли будете готові натисніть кнопку нижче щоб відкрити сторінку Zoom</JoinMessage>
          <JoinButton onClick={handleClick}>Доєднатись</JoinButton>
        </JoinWrapper>
      }
    </TrialLessonContainer>
  );
};

export default TrialLesson;
