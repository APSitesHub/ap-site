import { useEffect } from 'react';
import { RedirectDescription } from '../ServiceNav/ServiceNav.styled';

const WhatsAppRedirect = () => {
  useEffect(() => {
    window.location.replace('https://wa.me/380973214134');
  }, []);

  return (
    <RedirectDescription>
      Зачекайте, перенаправляємо Вас в наш WhatsApp-чат...
    </RedirectDescription>
  );
};

export default WhatsAppRedirect;
