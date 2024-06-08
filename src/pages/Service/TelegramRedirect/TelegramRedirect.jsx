import { useEffect } from 'react';
import { RedirectDescription } from '../ServiceNav/ServiceNav.styled';

const TelegramRedirect = () => {
  useEffect(() => {
    window.location.replace('https://t.me/apeducation_service_bot');
  }, []);

  return (
    <RedirectDescription>
      Зачекайте, перенаправляємо Вас в наш Telegram-бот...
    </RedirectDescription>
  );
};

export default TelegramRedirect;
