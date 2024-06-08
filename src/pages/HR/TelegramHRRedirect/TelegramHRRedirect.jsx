import { useEffect } from 'react';
import { RedirectDescription } from '../HRNav/HRNav.styled';

const TelegramHRRedirect = () => {
  useEffect(() => {
    window.location.replace('https://t.me/+380973620534');
  }, []);

  return (
    <RedirectDescription>
      Зачекайте, перенаправляємо Вас до наших HR-ів у Telegram...
    </RedirectDescription>
  );
};

export default TelegramHRRedirect;
