import { useEffect } from 'react';
import { RedirectDescription } from '../HRNav/HRNav.styled';

let browserRegexp = /android|iphone|kindle|ipad/i;

const ViberHRRedirect = () => {
  useEffect(() => {
    const replace = () => {
      browserRegexp.test(navigator.userAgent)
        ? window.location.replace('viber://contact?number=380962304176')
        : window.location.replace('viber://chat?number=+380962304176');
    };
    replace();
  }, []);

  return (
    <RedirectDescription>
      Зачекайте, перенаправляємо Вас до наших HR-ів у Viber...
    </RedirectDescription>
  );
};

export default ViberHRRedirect;
