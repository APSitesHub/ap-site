import { useEffect } from 'react';
import { RedirectDescription } from '../ServiceNav/ServiceNav.styled';

const ViberMarathonRedirect = () => {
  useEffect(() => {
    window.location.replace('viber://pa?chatURI=testonebox41423');
  }, []);

  return (
    <RedirectDescription>
      Зачекайте, перенаправляємо Вас в наш Viber-бот...
    </RedirectDescription>
  );
};

export default ViberMarathonRedirect;
