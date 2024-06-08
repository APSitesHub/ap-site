import { useEffect } from 'react';
import { RedirectDescription } from '../ServiceNav/ServiceNav.styled';

const TelegramMarathonRedirect = () => {
  useEffect(() => {
    window.location.replace('https://t.me/ap_service_marathon_bot');
  }, []);

  return (
    <RedirectDescription>
      Зачекайте, перенаправляємо Вас в наш Telegram-бот...
    </RedirectDescription>
  );
};

export default TelegramMarathonRedirect;
