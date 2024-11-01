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
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { MyPlatform } from './My Platform/MyPlatform';
import { MyAPPanel } from './MyAPPanel/MyAPPanel';
import {
  ChatButtonHideSwitch,
  PanelHideLeftSwitch,
  PanelHideRightSwitch,
} from './MyAPPanel/MyAPPanel.styled';

const MyAP = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [lessons, setLessons] = useState(false);
  const [points, setPoints] = useState({});
  const [timetable, setTimetable] = useState({});
  const [montlyPoints, setMonthlyPoints] = useState({});
  const [user, setUser] = useState({});
  const [languageIndex, setLanguageIndex] = useState(0);
  const [language, setLanguage] = useState('');
  const [platformLink, setPlatformLink] = useState(
    `https://online.ap.education/`
  );
  const [marathonLink, setMarathonLink] = useState(
    `https://online.ap.education/`
  );
  const [isMultipleCourses, setIsMultipleCourses] = useState(false);
  axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
  const location = useLocation();
  // const linkToSet = `https://online.ap.education/student/lessons`;

  const [isChatButtonShown, setIsChatButtonShown] = useState(
    localStorage.getItem('ischatboxshown') === 'true' ? true : false
  );

  const toggleChatButton = () => {
    setIsChatButtonShown(isShown => !isShown);
    localStorage.setItem('ischatboxshown', !isChatButtonShown);
  };

  useEffect(() => {
    document.title = 'My AP | AP Education';

    const button = document.querySelector('.amo-button-holder');
    if (button && !isChatButtonShown) {
      button.style.transform = 'translate(400px)';
      button.style.transition = 'ease 250ms';
    } else if (button && isChatButtonShown) {
      button.style.transform = '';
    }

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
      const LINKS = {
        en1: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=37835&pupilId=${user.pupilId}&marathonLessonId=621674`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=37835&pupilId=${user.pupilId}&marathonLessonId=621674`,
        en2: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=847031`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=847031`,
        pl: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=41057&pupilId=${user.pupilId}&marathonLessonId=629354`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=41057&pupilId=${user.pupilId}&marathonLessonId=629354`,
        de: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=41534&pupilId=${user.pupilId}&marathonLessonId=629357`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=41534&pupilId=${user.pupilId}&marathonLessonId=629357`,
        enkids1: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=40552&pupilId=${user.pupilId}&marathonLessonId=621673`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=40552&pupilId=${user.pupilId}&marathonLessonId=621673`,
        enkids2: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=50784&pupilId=${user.pupilId}&marathonLessonId=847034`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=50784&pupilId=${user.pupilId}&marathonLessonId=847034`,
        dekids: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=65423&pupilId=${user.pupilId}&marathonLessonId=968639`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=65423&pupilId=${user.pupilId}&marathonLessonId=968639`,
        plkids: user.platformToken
          ? `https://online.ap.education/Account/LoginByToken?token=${
              user.platformToken
            }&redirectUrl=${encodeURIComponent(
              `https://online.ap.education/MarathonClass/?marathonId=64039&pupilId=${user.pupilId}&marathonLessonId=952360`
            )}`
          : `https://online.ap.education/MarathonClass/?marathonId=64039&pupilId=${user.pupilId}&marathonLessonId=952360`,
      };

      const marathonLink =
        language === 'en' && user.marathonNumber === '1'
          ? 'en1'
          : language === 'en' && user.marathonNumber === '2'
          ? 'en2'
          : language === 'en' && !user.marathonNumber
          ? 'en2'
          : language === 'pl'
          ? 'pl'
          : language === 'de'
          ? 'de'
          : language === 'plkids'
          ? 'plkids'
          : language === 'dekids'
          ? 'dekids'
          : language === 'enkids' && user.marathonNumber === '1'
          ? 'enkids1'
          : language === 'enkids' && user.marathonNumber === '2'
          ? 'enkids2'
          : language === 'enkids' && !user.marathonNumber
          ? 'enkids2'
          : '';

      console.log(LINKS[marathonLink]);

      const FREE_LINKS = {
        kids: `https://online.ap.education/MarathonClass/?marathonId=50784&pupilId=${user.pupilId}&marathonLessonId=854264`,
        ena1: `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=854277`,
        ena2: `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=854278`,
        pl: `https://online.ap.education/MarathonClass/?marathonId=41057&pupilId=${user.pupilId}&marathonLessonId=853147`,
        de: `https://online.ap.education/MarathonClass/?marathonId=41534&pupilId=${user.pupilId}&marathonLessonId=854256`,
      };

      setPlatformLink(link => (link = LINKS[marathonLink]));
      setMarathonLink(link => (link = FREE_LINKS[marathonLink]));
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
        setIsMultipleCourses(true);
      }
      localStorage.setItem('mail', values.mail);
      resetForm();
    } catch (error) {
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
        <>
          {Object.values(points).length > 0 && (
            <MyAPPanel
              lessons={lessons}
              user={user}
              points={points}
              montlyPoints={montlyPoints}
              link={platformLink}
              marathonLink={marathonLink}
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
            {isChatButtonShown ? (
              <PanelHideRightSwitch />
            ) : (
              <PanelHideLeftSwitch />
            )}
          </ChatButtonHideSwitch>
        </>
      )}
    </StreamSection>
  );
};

export default MyAP;
