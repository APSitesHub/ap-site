import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

export const PhoneNumberInput = () => {
  return (
    <>
      <PhoneInput
        country={'ua'}
        preferredCountries={['ua', 'pl']}
        excludeCountries={['ru']}
        regions={'europe'}
      />
    </>
  );
};
