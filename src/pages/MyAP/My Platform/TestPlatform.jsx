import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  BackgroundVideo,
  MyAPBackground,
  MyPlatformBox,
  TestLogo,
  TestPlatformSpoiler,
} from './MyPlatform.styled';

export const TestPlatform = ({ platformLink }) => {
  const [src, setSrc] = useState('https://online.ap.education/school/');
  const location = useLocation().search.slice(1);

  // Стейт для таймера
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 хвилин у секундах

  useEffect(() => {
    const setIframeSRC = () => {
      !platformLink && !location
        ? setSrc('https://online.ap.education/school/')
        : !location
          ? setSrc(platformLink)
          : setSrc(location);
    };

    setIframeSRC();
  }, [platformLink, location]);

  useEffect(() => {
    // Функція для зменшення часу
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer); // Зупиняємо таймер, коли час вичерпано
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Відлік кожну секунду

    // Очищаємо таймер при розмонтажуванні компоненти
    return () => clearInterval(timer);
  }, []);

  const removeVideo = () => {
    setTimeout(() => {
      document.querySelector('[title="AP Education"]').remove();
    }, 15000);
  };

  removeVideo();

  // Функція для форматування часу в хвилини і секунди
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <MyAPBackground>
      <BackgroundVideo
        playsInline
        loop
        autoPlay
        muted
        src="https://www.ap.education/assets/video/Logo_Green.mp4"
        title="AP Education"
      />
      <TestPlatformSpoiler>
        <div>Time Left: {formatTime(timeLeft)}</div> {/* Відображаємо таймер */}
        <TestLogo />
      </TestPlatformSpoiler>
      <MyPlatformBox>
        <iframe
          id="platform-window"
          title="platform-pin"
          src={src}
          width="100%"
          height="100%"
          allow="microphone *"
        ></iframe>
      </MyPlatformBox>
    </MyAPBackground>
  );
};
