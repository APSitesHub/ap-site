import axios from 'axios';
import {
  Label,
  LeftFormBackgroundStar,
  RightFormBackgroundStar,
} from 'components/LeadForm/LeadForm.styled';
import { LoginFormText, StreamSection } from 'components/Stream/Stream.styled';
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

const ConferenceTest = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState({});
  const [language, setLanguage] = useState('');
  const [platformLink, setPlatformLink] = useState(
    `https://online.ap.education/`
  );

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
              `https://online.ap.education/MarathonClass/?marathonId=37835&pupilId=${user.pupilId}&marathonLessonId=1143131`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=37835&pupilId=${user.pupilId}&marathonLessonId=1143131`,
        en2: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=1143132`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=1143132`,

        enkids1: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=40552&pupilId=${user.pupilId}&marathonLessonId=1143134`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=40552&pupilId=${user.pupilId}&marathonLessonId=1143134`,
        enkids2: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=50784&pupilId=${user.pupilId}&marathonLessonId=1143133`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=50784&pupilId=${user.pupilId}&marathonLessonId=1143133`,
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
      resetForm();
    } catch (error) {
      console.error(error);
    }
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
              Привіт!
              <br />
              Ця сторінка недоступна для неавторизованих користувачів. Але якщо
              ви маєте доступ до нашої платформи, то й до цієї сторінки теж.
              Введіть дані, які ви використовуєте для входу на платформу.
            </LoginFormText>
            <Label>
              <AdminInput type="text" name="mail" placeholder="Login" />
              <AdminInputNote component="p" name="mail" type="email" />
            </Label>
            <Label>
              <AdminInput
                type="password"
                name="password"
                placeholder="Password"
              />
              <AdminInputNote component="p" name="password" />
            </Label>
            <AdminFormBtn type="submit">Увійти</AdminFormBtn>
          </LoginForm>
        </Formik>
      ) : (
        <TestPlatform platformLink={platformLink} />
      )}
    </StreamSection>
  );
};

export default ConferenceTest;
