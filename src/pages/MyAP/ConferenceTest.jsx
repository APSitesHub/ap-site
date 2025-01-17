import axios from 'axios';
import {
  Label,
  LeftFormBackgroundStar,
  RightFormBackgroundStar,
} from 'components/LeadForm/LeadForm.styled';
import {
  LoginErrorNote,
  LoginFormText,
  StreamSection,
} from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { TestPlatform } from './My Platform/TestPlatform';
import { toZonedTime } from 'date-fns-tz';
import { differenceInSeconds } from 'date-fns';

const ConferenceTest = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState({});
  const [language, setLanguage] = useState('');
  const [platformLink, setPlatformLink] = useState(
    `https://online.ap.education/`
  );
  const [isBefore13, setIsBefore13] = useState(true); // Стейт для перевірки часу
  const [isAter14, setIsAter14] = useState(false);
  const [isTestStarted, setIsTestStarted] = useState(false); // Стейт для того, щоб відобразити TestPlatform
  const [testEnded, setTestEnded] = useState(false); // Стейт для завершення тесту
  // eslint-disable-next-line
  const [startTime, setStartTime] = useState(null); // Час початку тесту
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);

  axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

  useEffect(() => {
    document.title = 'My AP | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        const res = await axios.post('/users/refresh', {
          mail: localStorage.getItem('mail'),
        });
        setIsUserLogged(isLogged => (isLogged = true));
        console.log(73, res.data.user.platformToken);
        setUser(user => (user = { ...res.data.user }));
        const lang = res.data.user.lang.split('/');
        if (lang.length > 1 && !language) {
          setLanguage(lang[0]);
        } else if (lang.length <= 1) {
          setLanguage(res.data.user.lang);
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const setIframeLinks = async () => {
      const LINKS = {
        en1: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=37835&pupilId=${user.pupilId}&marathonLessonId=1157251`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=37835&pupilId=${user.pupilId}&marathonLessonId=1157251`,
        en2: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=1157255`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=1157255`,

        enkids1: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=40552&pupilId=${user.pupilId}&marathonLessonId=1157234`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=40552&pupilId=${user.pupilId}&marathonLessonId=1157234`,
        enkids2: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=50784&pupilId=${user.pupilId}&marathonLessonId=1157243`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=50784&pupilId=${user.pupilId}&marathonLessonId=1157243`,
      };

      const marathonLink =
        language === 'en' && user.marathonNumber === '1'
          ? 'en1'
          : language === 'en' && user.marathonNumber === '2'
            ? 'en2'
            : language === 'en' && !user.marathonNumber
              ? 'en2'
              : language === 'enkids' && user.marathonNumber === '1'
                ? 'enkids1'
                : language === 'enkids' && user.marathonNumber === '2'
                  ? 'enkids2'
                  : language === 'enkids' && !user.marathonNumber
                    ? 'enkids2'
                    : '';

      console.log(LINKS[marathonLink]);

      setPlatformLink(link => (link = LINKS[marathonLink]));
    };

    setIframeLinks();

    // Перевірка часу в Києві
    const checkTime = () => {
      const kyivTime = new Date();
      const kyivTimeInZone = toZonedTime(kyivTime, 'Europe/Kiev');
      const targetDate = new Date('2024-12-14T13:29:30+02:00');
      const endDate = new Date('2024-12-14T14:15:00+02:00');

      const timeDifferenceInSecondsStart = differenceInSeconds(
        targetDate,
        kyivTimeInZone
      );
      const timeDifferenceInSecondsEnd = differenceInSeconds(
        endDate,
        kyivTimeInZone
      );

      if (timeDifferenceInSecondsStart < 0) {
        setIsBefore13(false);
      }
      if (timeDifferenceInSecondsEnd <= 0) {
        setIsAter14(true);
      }
    };
    const timer = setInterval(() => {
      checkTime();
    }, 1000);
    return () => clearInterval(timer);
  }, [language, user.pupilId, user.marathonNumber, user.platformToken]);

  const setAuthToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const initialLoginValues = {
    mail: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    mail: yup
      .string()
      .required('Вкажіть пошту, за якою ви зареєстровані на нашій платформі!'),
    password: yup
      .string()
      .required(
        'Введіть пароль, який ви використовуєте для входу на нашу платформу!'
      ),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/users/login', values);
      console.log(response);

      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setUser(user => (user = { ...response.data.user }));
      const lang = response.data.user.lang.split('/');
      if (lang.length > 1) {
        setLanguage(lang[0]);
      }
      localStorage.setItem('mail', values.mail);
      setIsUserInfoIncorrect(false);
      resetForm();
    } catch (error) {
      error.response.status === 401 && setIsUserInfoIncorrect(true);
      console.error(error);
    }
  };

  // Функція для початку тесту
  const startTest = () => {
    const currentTime = new Date().toISOString(); // Поточний час з мілісекундами
    localStorage.setItem('testStartTime', currentTime); // Зберігаємо час початку тесту
    setStartTime(currentTime); // Оновлюємо стейт
    setIsTestStarted(true); // Відображаємо TestPlatform// 40 хвилин в мілісекундах
  };

  // Функція для виходу
  const handleExit = () => {
    localStorage.removeItem('testStartTime');
    setTestEnded(true);
    setIsTestStarted(false);
  };

  return (
    <StreamSection>
      {!isUserLogged ? (
        <Formik
          initialValues={initialLoginValues}
          onSubmit={handleLoginSubmit}
          validationSchema={loginSchema}
        >
          <LoginForm>
            <LeftFormBackgroundStar />
            <RightFormBackgroundStar />
            <LoginFormText>
              Привіт! Введіть дані для входу на платформу.
            </LoginFormText>
            <Label>
              <AdminInput
                type="text"
                name="mail"
                placeholder="Login"
                onBlur={() => setIsUserInfoIncorrect(false)}
              />
              <AdminInputNote component="p" name="mail" type="email" />
            </Label>
            <Label>
              <AdminInput
                type="password"
                name="password"
                placeholder="Password"
                onBlur={() => setIsUserInfoIncorrect(false)}
              />
              <AdminInputNote component="p" name="password" />
            </Label>
            <AdminFormBtn type="submit">Увійти</AdminFormBtn>
            <LoginErrorNote
              style={isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }}
            >
              Логін або пароль введено неправильно!
            </LoginErrorNote>
          </LoginForm>
        </Formik>
      ) : (
        // Заглушка та кнопка для початку тесту
        !isTestStarted &&
        !isAter14 &&
        !testEnded && (
          <div style={overlayStyle}>
            {isBefore13 ? (
              <div style={messageStyle}>
                <p>
                  Тест готується до тебе, так як ти готувався до нього. Ще трохи
                  часу, щоб переконатися, що ти все знаєш) Скоро почнемо!
                </p>
              </div>
            ) : (
              <button onClick={startTest} style={buttonStyle}>
                Розпочати тест
              </button>
            )}
          </div>
        )
      )}

      {isTestStarted && !testEnded && (
        <TestPlatform platformLink={platformLink} handleExit={handleExit} />
      )}

      {/* Показуємо повідомлення про завершення тесту та пароль для виходу */}
      {(testEnded || isAter14) && (
        <div style={overlayStyle}>
          <div>
            <div style={meassgeWrapperStyle}>
              <div style={messageStyle}>Тест завершено</div>
              <div style={messageOuttStyle}>
                <p>Пароль для виходу</p>
                <p style={messagePasswordStyle}>
                  <b>quitconf2024</b>
                </p>
              </div>
            </div>
            <div style={arrowWrapperStyle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="32"
                height="32"
                style={arrowStyle}
              >
                <path
                  d="M30 15v13.59L1.71.29.29 1.71 28.59 30H16v2h15a1 1 0 0 0 1-1V15z"
                  data-name="8-Arrow Down"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </StreamSection>
  );
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const messageStyle = {
  color: 'white',
  fontSize: '20px',
  marginBottom: '20px',
  margintLeft: '10px',
  margintRight: '10px',
  maxWidth: '375px',
  textAlign: 'center',
};

const messageOuttStyle = {
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  fontSize: '20px',
  marginBottom: '20px',
};

const messagePasswordStyle = {
  fontSize: '40px',
};

const meassgeWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

const arrowWrapperStyle = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  cursor: 'pointer',
  zIndex: 9999,
};

const arrowStyle = {
  fill: 'white',
  fontWeight: 'bold', // Щоб зробити стрілку "жирною"
};
export default ConferenceTest;
