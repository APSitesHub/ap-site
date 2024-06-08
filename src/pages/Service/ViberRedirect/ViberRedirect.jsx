import { useEffect } from 'react';
import { RedirectDescription } from '../ServiceNav/ServiceNav.styled';

const ViberRedirect = () => {
  useEffect(() => {
    window.location.replace('viber://pa?chatURI=apeducationservice');
  }, []);

  return (
    <RedirectDescription>
      Зачекайте, перенаправляємо Вас в наш Viber-бот...
    </RedirectDescription>
  );
};

export default ViberRedirect;
