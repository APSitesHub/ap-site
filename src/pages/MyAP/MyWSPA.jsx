import axios from 'axios';
import { FormBtnWSPA, Label } from 'components/LeadForm/LeadForm.styled';
import {
  LoginErrorNote,
  LoginFormTextWSPA,
  StreamSection,
} from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import { FormBtnText } from 'pages/LeadFormPage/UniversalLeadFormPage.styled';
import {
  AdminInputNoteWSPA,
  AdminInputWSPA,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import logo from '../../img/svg/myap/uni-logos/wspa.png';
import { MyPlatform } from './My Platform/MyPlatform';
import {
  ChatButtonHideSwitch,
  PanelHideLeftSwitch,
  PanelHideRightSwitch,
  UniLoginLogo,
} from './MyAPPanel/MyAPPanel.styled';
import { MyWSPAPanel } from './MyAPPanel/MyWSPAPanel';

const monthly = [
  { name: 'Adam Nowak', points: 327 },
  { name: 'Bartosz Kowalski', points: 458 },
  { name: 'Cezary Wiśniewski', points: 783 },
  { name: 'Damian Wójcik', points: 604 },
  { name: 'Emil Kamiński', points: 536 },
  { name: 'Filip Lewandowski', points: 918 },
  { name: 'Grzegorz Zieliński', points: 629 },
  { name: 'Hubert Szymański', points: 705 },
  { name: 'Igor Woźniak', points: 847 },
  { name: 'Jakub Dąbrowski', points: 509 },
  { name: 'Kamil Kozłowski', points: 987 },
  { name: 'Łukasz Jankowski', points: 734 },
  { name: 'Mateusz Mazur', points: 685 },
  { name: 'Norbert Kwiatkowski', points: 595 },
  { name: 'Olaf Piotrowski', points: 819 },
  { name: 'Patryk Grabowski', points: 914 },
  { name: 'Robert Pawłowski', points: 727 },
  { name: 'Szymon Michalski', points: 664 },
  { name: 'Tomasz Król', points: 874 },
  { name: 'Uriel Wieczorek', points: 765 },
  { name: 'Wojciech Jastrzębski', points: 886 },
  { name: 'Zbigniew Tomczak', points: 547 },
  { name: 'Artur Jarosz', points: 924 },
  { name: 'Borys Malinowski', points: 586 },
  { name: 'Daniel Gajewski', points: 746 },
  { name: 'Edward Krupa', points: 618 },
  { name: 'Fryderyk Brzeziński', points: 674 },
  { name: 'Gustaw Stępień', points: 758 },
  { name: 'Henryk Wróbel', points: 879 },
  { name: 'Ireneusz Lis', points: 995 },
  { name: 'Dev Acc', points: 747 },
];

const yearly = [
  { name: 'Adam Nowak', points: 2413 },
  { name: 'Bartosz Kowalski', points: 3129 },
  { name: 'Cezary Wiśniewski', points: 4217 },
  { name: 'Damian Wójcik', points: 2728 },
  { name: 'Emil Kamiński', points: 3514 },
  { name: 'Filip Lewandowski', points: 4619 },
  { name: 'Grzegorz Zieliński', points: 3012 },
  { name: 'Hubert Szymański', points: 3716 },
  { name: 'Igor Woźniak', points: 4328 },
  { name: 'Jakub Dąbrowski', points: 2915 },
  { name: 'Kamil Kozłowski', points: 4823 },
  { name: 'Łukasz Jankowski', points: 4118 },
  { name: 'Mateusz Mazur', points: 3611 },
  { name: 'Norbert Kwiatkowski', points: 2832 },
  { name: 'Olaf Piotrowski', points: 4427 },
  { name: 'Patryk Grabowski', points: 4715 },
  { name: 'Robert Pawłowski', points: 3936 },
  { name: 'Szymon Michalski', points: 3421 },
  { name: 'Tomasz Król', points: 4533 },
  { name: 'Uriel Wieczorek', points: 4029 },
  { name: 'Wojciech Jastrzębski', points: 4578 },
  { name: 'Zbigniew Tomczak', points: 3219 },
  { name: 'Artur Jarosz', points: 4832 },
  { name: 'Borys Malinowski', points: 3134 },
  { name: 'Daniel Gajewski', points: 4075 },
  { name: 'Edward Krupa', points: 2931 },
  { name: 'Fryderyk Brzeziński', points: 3562 },
  { name: 'Gustaw Stępień', points: 3971 },
  { name: 'Henryk Wróbel', points: 4526 },
  { name: 'Ireneusz Lis', points: 4918 },
  { name: 'Dev Acc', points: 3178 },
];

const pltimetable = [
  {
    day: 1,
    subject: 'Polish',
    lessonNumber: '1',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 1,
    subject: 'English',
    lessonNumber: '1',
    time: '13:00',
    marathon: 'prep',
  },
  {
    day: 2,
    subject: 'English',
    lessonNumber: '1',
    time: '11:00',
    marathon: 'logistics',
  },
  {
    day: 2,
    subject: 'Supply chain management',
    lessonNumber: '1',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 2,
    subject: 'Knowledge about Poland',
    lessonNumber: '1',
    time: '13:00',
    marathon: 'prep',
  },
  {
    day: 3,
    subject: 'Inventory management',
    lessonNumber: '1',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 3,
    subject: 'Adaptation in Europe',
    lessonNumber: '1',
    time: '13:00',
    marathon: 'prep',
  },
  {
    day: 4,
    subject: 'Polish',
    lessonNumber: '1',
    time: '11:00',
    marathon: 'logistics',
  },
  {
    day: 4,
    subject: 'Balanced logistics ',
    lessonNumber: '1',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 4,
    subject: 'Polish',
    lessonNumber: '1',
    time: '13:00',
    marathon: 'prep',
  },
  {
    day: 5,
    subject: 'English',
    lessonNumber: '2',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 5,
    subject: 'English',
    lessonNumber: '2',
    time: '13:00',
    marathon: 'prep',
  },
];

const MyWSPA = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [lessons, setLessons] = useState(false);
  const [points, setPoints] = useState({});
  const [timetable, setTimetable] = useState({});
  const [montlyPoints, setMonthlyPoints] = useState({});
  const [user, setUser] = useState({});
  const [languageIndex, setLanguageIndex] = useState(0);
  const [language, setLanguage] = useState('pl');
  const [platformLink, setPlatformLink] = useState(`https://online.ap.education/`);
  const [isMultipleLanguages, setIsMultipleLanguages] = useState(false);
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
    document.title = 'My WSPA';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        const res = await axios.post('/uniusers/refresh', {
          mail: localStorage.getItem('mail'),
        });
        setIsUserLogged(isLogged => (isLogged = true));
        console.log(73, res.data.user.platformToken);
        setUser(user => (user = { ...res.data.user }));
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
        setPoints(points => (points = [...yearly]));
        setMonthlyPoints(points => (points = [...monthly]));
      } catch (error) {
        console.log(error);
      }
    };
    getRating();

    const getTimetable = async () => {
      console.log('timetable getter');
      try {
        const res = await axios.get('/timetable');
        console.log(189, res);
        setTimetable(timetable => (timetable = [...pltimetable]));
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
      const response = await axios.post('/uniusers/login', values);
      console.log(response);

      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setUser(user => (user = { ...response.data.user }));
      const lang = response.data.user.lang.split('/');
      if (lang.length > 1) {
        setLanguage(lang[0]);
        setIsMultipleLanguages(true);
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
            <UniLoginLogo src={logo} alt="WSPA logo" />
            <LoginFormTextWSPA>
              Dzień dobry!
              <br />
              Ta strona nie jest dostępna dla nieautoryzowanych użytkowników. Proszę
              wprowadzić swój login i hasło.
            </LoginFormTextWSPA>
            <Label>
              <AdminInputWSPA
                type="text"
                name="mail"
                placeholder="Login"
                onBlur={() => setIsUserInfoIncorrect(false)}
              />
              <AdminInputNoteWSPA component="p" name="mail" type="email" />
            </Label>
            <Label>
              <AdminInputWSPA
                type="password"
                name="password"
                placeholder="Password"
                onBlur={() => setIsUserInfoIncorrect(false)}
              />
              <AdminInputNoteWSPA component="p" name="password" />
            </Label>
            <FormBtnWSPA type="submit">
              <FormBtnText> Zaloguj się </FormBtnText>
            </FormBtnWSPA>
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
            <MyWSPAPanel
              lessons={lessons}
              user={user}
              points={points}
              montlyPoints={montlyPoints}
              link={platformLink}
              isMultipleLanguages={isMultipleLanguages}
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

export default MyWSPA;
