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
import { MyPlatform } from './My Platform/MyPlatform';
import { MyAPPanel } from './MyAPPanel/MyAPPanel';
import { useLocation } from 'react-router-dom';

const MyAP = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [lessons, setLessons] = useState(false);
  const [points, setPoints] = useState({});
  const [timetable, setTimetable] = useState({});
  const [montlyPoints, setMonthlyPoints] = useState({});
  const [user, setUser] = useState({});
  const [platformLink, setPlatformLink] = useState(
    `https://online.ap.education/`
  );
  const [marathonLink, setMarathonLink] = useState(
    `https://online.ap.education/`
  );
  axios.defaults.baseURL = 'https://aggregator-server.onrender.com';
  const location = useLocation();
  // const linkToSet = `https://online.ap.education/student/lessons`;

  useEffect(() => {
    // const changeProtocol = () =>
    //   window.location.protocol === 'https:'
    //     ? window.location.replace('http://www.ap.education/my-ap')
    //     : console.log('protocol okay');
    // changeProtocol();

    document.title = 'My AP | AP Education';

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

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        const res = await axios.post('/users/refresh', {
          mail: localStorage.getItem('mail'),
        });
        setIsUserLogged(isLogged => (isLogged = true));
        console.log(res);
        setUser(user => (user = { ...res.data.user }));
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const setIframeLinks = async () => {
      const LINKS = {
        en: `https://online.ap.education/MarathonClass/?marathonId=37835&pupilId=${user.pupilId}&marathonLessonId=621674`,
        pl: `https://online.ap.education/MarathonClass/?marathonId=41057&pupilId=${user.pupilId}&marathonLessonId=629354`,
        de: `https://online.ap.education/MarathonClass/?marathonId=41534&pupilId=${user.pupilId}&marathonLessonId=629357`,
        //online.ap.education/MarathonClass/?marathonId=40552&pupilId=${user.pupilId}&marathonLessonId=621673 - FromZeroToHero Children
      };

      const marathonLink =
        user.lang === 'en' && user.knowledge === 'a1'
          ? 'ena1'
          : user.lang === 'en' && user.knowledge === 'a2'
          ? 'ena2'
          : user.lang === 'pl'
          ? 'pl'
          : user.lang === 'de' && user.knowledge === 'a1'
          ? 'dea1'
          : user.lang === 'de' && user.knowledge === 'a2'
          ? 'dea2'
          : user.lang === 'enkids'
          ? 'kids'
          : '';

      const FREE_LINKS = {
        kids: `https://online.ap.education/MarathonClass/?marathonId=50784&pupilId=${user.pupilId}&marathonLessonId=854264`,
        ena1: `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=854277`,
        ena2: `https://online.ap.education/MarathonClass/?marathonId=49509&pupilId=${user.pupilId}&marathonLessonId=854278`,
        pl: `https://online.ap.education/MarathonClass/?marathonId=41057&pupilId=${user.pupilId}&marathonLessonId=853147`,
        dea1: `https://online.ap.education/MarathonClass/?marathonId=41534&pupilId=${user.pupilId}&marathonLessonId=854256`,
        dea2: `https://online.ap.education/MarathonClass/?marathonId=41534&pupilId=${user.pupilId}&marathonLessonId=854258`,
      };

      setPlatformLink(link => (link = LINKS[user.lang]));
      setMarathonLink(link => (link = FREE_LINKS[marathonLink]));
    };

    setIframeLinks();
  }, [user.lang, user.pupilId, user.knowledge]);

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
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setUser(user => (user = { ...response.data.user }));
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
              setPlatformIframeLink={setPlatformIframeLink}
              timetable={timetable}
            />
          )}
          <MyPlatform platformLink={platformLink} />
        </>
      )}
    </StreamSection>
  );
};

export default MyAP;
