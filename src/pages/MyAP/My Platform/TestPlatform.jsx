import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toZonedTime } from 'date-fns-tz';
import { differenceInSeconds } from 'date-fns';
import {
  MyAPBackground,
  MyPlatformBox,
  TestLogo,
  TestPlatformSpoiler,
} from './MyPlatform.styled';

export const TestPlatform = ({ platformLink, handleExit }) => {
  const [src, setSrc] = useState('https://online.ap.education/school/');
  const location = useLocation().search.slice(1);

  // Стейт для таймера
  const [timeLeft, setTimeLeft] = useState(0); // Початкове значення час в секундах

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
    const targetDate = new Date('2024-12-13T18:02:00+02:00'); // Цільова дата 16:30 13.12.2024
    const updateTimeLeft = () => {
      const kyivTime = new Date();
      const kyivTimeInZone = toZonedTime(kyivTime, 'Europe/Kiev'); // Поточний час в Києві
      const timeDifferenceInSeconds = differenceInSeconds(
        targetDate,
        kyivTimeInZone
      ); // Різниця в секундах

      setTimeLeft(timeDifferenceInSeconds);

      // Якщо таймер досяг нуля, викликаємо функцію handleExit
      if (timeDifferenceInSeconds <= 0) {
        handleExit();
      }
    };

    updateTimeLeft(); // Оновлюємо час при першому рендері

    // Оновлюємо час кожну секунду
    const timer = setInterval(() => {
      updateTimeLeft();
    }, 1000);

    // Очищаємо таймер при розмонтажуванні компоненти
    return () => clearInterval(timer);
  }, [handleExit]); // Залежність від handleExit, щоб пересвідчитись, що функція не змінюється

  // Функція для форматування часу в хвилини і секунди
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <MyAPBackground>
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
