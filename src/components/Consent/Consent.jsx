import CookieConsent from 'react-cookie-consent';
import { ConsentText } from './Consent.styled';
import useSize from '@react-hook/size';
import { useEffect, useState } from 'react';
import { ReactComponent as ConsentIcon } from '../../img/svg/consent-icon.svg';

export const Consent = () => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);
  const [padding, setPadding] = useState('16px');

  useEffect(() => {
    const calculatePadding = () => {
      return width < 375
        ? setPadding('1px')
        : width >= 400 && width < 768
        ? setPadding('5px')
        : width >= 768 && width < 1280
        ? setPadding('25px')
        : width >= 1280 && width < 1920
        ? setPadding('45px')
        : setPadding('105px');
    };

    calculatePadding();
  }, [width]);

  return (
    <CookieConsent
      buttonText={
        <>
          <ConsentIcon />
          <span> Погоджуюсь </span>
        </>
      }
      cookieName="aggregator-consent"
      style={{
        background: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        padding: `0 ${padding}`,
        boxShadow: '0px -1px 9px 0px rgba(0, 0, 0, 0.18)',
      }}
      buttonStyle={{
        background: '#fff',
        borderRadius: '20px',
        padding: '10px 30px',
        border: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#000000',
        fontSize: '14px',
      }}
      expires={150}
    >
      <ConsentText>
        Ми використовуємо файли cookie на нашому веб-сайті, щоб бачити, як ви з
        ним взаємодієте. Приймаючи, ви погоджуєтесь на використання таких файлів
        cookie.
      </ConsentText>
    </CookieConsent>
  );
};
