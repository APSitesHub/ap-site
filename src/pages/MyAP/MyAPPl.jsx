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
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { MyPlatform } from './My Platform/MyPlatform';
import {
  ChatButtonHideSwitch,
  PanelHideLeftSwitch,
  PanelHideRightSwitch,
} from './MyAPPanel/MyAPPanel.styled';
import { MyAPPanelPl } from './MyAPPanel/MyAPPanelPl';

const MyAPPl = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [lessons, setLessons] = useState(false);
  const [points, setPoints] = useState({});
  const [timetable, setTimetable] = useState({});
  const [montlyPoints, setMonthlyPoints] = useState({});
  const [user, setUser] = useState({});
  const [languageIndex, setLanguageIndex] = useState(0);
  const [language, setLanguage] = useState('');
  const [platformLink, setPlatformLink] = useState(`https://online.ap.education/`);
  const [isMultipleCourses, setIsMultipleCourses] = useState(false);
  axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
  const location = useLocation();

  const [isChatButtonShown, setIsChatButtonShown] = useState(
    localStorage.getItem('ischatboxshown') === 'true' ? true : false
  );
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);

  const toggleChatButton = () => {
    setIsChatButtonShown(isShown => !isShown);
    localStorage.setItem('ischatboxshown', !isChatButtonShown);
  };

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
          setIsMultipleCourses(true);
          setLanguage(lang[languageIndex]);
        } else if (lang.length <= 1) {
          setLanguage(res.data.user.lang);
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const getLessons = async () => {
      console.log('lessons getter');
      try {
        const res = await axios.get('/lessons');
        console.log(res);
        setLessons(lessons => (lessons = [...res.data]));
      } catch (error) {
        console.log(error);
      }
    };
    getLessons();

    const getRating = async () => {
      console.log('ratings getter');
      try {
        const res = await axios.get('/ratings');
        setPoints(points => (points = { ...res.data[0].rating }));
        setMonthlyPoints(points => (points = { ...res.data[1].rating }));
      } catch (error) {
        console.log(error);
      }
    };
    getRating();

    const getTimetable = async () => {
      console.log('timetable getter');
      try {
        const res = await axios.get('/timetable');
        console.log(res);
        setTimetable(timetable => (timetable = res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getTimetable();

    const setIframeLinks = async () => {
      const authLink = user.platformToken
        ? `https://online.ap.education/Account/LoginByToken?token=${
            user.platformToken
          }&redirectUrl=${encodeURIComponent(
            `https://online.ap.education/cabinet/student/lessons`
          )}`
        : `https://online.ap.education/cabinet/student/lessons`;

      setPlatformLink(link => (link = authLink));
    };

    setIframeLinks();
  }, [
    language,
    languageIndex,
    isChatButtonShown,
    user.pupilId,
    user.marathonNumber,
    user.platformToken,
  ]);

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
      .required(
        'Podaj adres e-mail, za pomocą którego jesteś zarejestrowany na naszej platformie!'
      ),
    password: yup
      .string()
      .required('Podaj parol, którego używasz do logowania się na naszej platformie!'),
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
        setIsMultipleCourses(true);
      }
      localStorage.setItem('mail', values.mail);
      setIsUserInfoIncorrect(false);
      resetForm();
    } catch (error) {
      error.response.status === 401 && setIsUserInfoIncorrect(true);
      console.error(error);
    }
  };

  const setPlatformIframeLink = iframeLink => {
    location.search = '';
    setPlatformLink(link => (link = iframeLink));
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
              Dzień dobry!
              <br />
              Ta strona nie jest dostępna dla nieautoryzowanych użytkowników. Jeśli jednak
              masz dostęp do naszej platformy, to ta strona również ją ma. Wchodzić dane,
              których używasz do logowania się na platformie.
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
            <AdminFormBtn type="submit">Zaloguj się</AdminFormBtn>
            <LoginErrorNote
              style={isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }}
            >
              Podany login lub parol są nieprawidłowe!
            </LoginErrorNote>
          </LoginForm>
        </Formik>
      ) : (
        <>
          {Object.values(points).length > 0 && (
            <MyAPPanelPl
              lessons={lessons}
              user={user}
              points={points}
              montlyPoints={montlyPoints}
              link={platformLink}
              isMultipleCourses={isMultipleCourses}
              setPlatformIframeLink={setPlatformIframeLink}
              language={language}
              setLanguage={setLanguage}
              languageIndex={languageIndex}
              setLanguageIndex={setLanguageIndex}
              timetable={timetable}
            />
          )}
          <MyPlatform platformLink={platformLink} />
          <ChatButtonHideSwitch id="no-transform" onClick={toggleChatButton}>
            {isChatButtonShown ? <PanelHideRightSwitch /> : <PanelHideLeftSwitch />}
          </ChatButtonHideSwitch>
        </>
      )}
    </StreamSection>
  );
};

export default MyAPPl;
