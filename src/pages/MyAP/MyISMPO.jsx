import axios from 'axios';
import { FormBtnISMPO, Label } from 'components/LeadForm/LeadForm.styled';
import {
  LoginErrorNote,
  LoginFormTextWSPA,
  StreamSection,
} from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import { FormBtnText } from 'pages/LeadFormPage/UniversalLeadFormPage.styled';
import {
  AdminInputISMPO,
  AdminInputNoteWSPA,
  LoginForm
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import logo from '../../img/svg/myap/uni-logos/ismpo.png';
import { MyPlatform } from './My Platform/MyPlatform';
import {
  ChatButtonHideSwitch,
  PanelHideLeftSwitch,
  PanelHideRightSwitch,
  UniLoginLogo,
} from './MyAPPanel/MyAPPanel.styled';
import { MyISMPOPanel } from './MyAPPanel/MyISMPOPanel';

const monthly = [
  { name: 'Adam Novák', points: 327 },
  { name: 'Boris Kováč', points: 458 },
  { name: 'Cyril Višňovský', points: 783 },
  { name: 'Dušan Vojtík', points: 604 },
  { name: 'Erik Kamenický', points: 536 },
  { name: 'Filip Levický', points: 918 },
  { name: 'Gabriel Zelený', points: 629 },
  { name: 'Henrich Sýkora', points: 705 },
  { name: 'Igor Varga', points: 847 },
  { name: 'Jakub Dobrovodský', points: 509 },
  { name: 'Karol Kozák', points: 987 },
  { name: 'Lukáš Jankovič', points: 734 },
  { name: 'Matúš Mazúr', points: 685 },
  { name: 'Norbert Krištof', points: 595 },
  { name: 'Oliver Pitoňák', points: 819 },
  { name: 'Patrik Gregor', points: 914 },
  { name: 'Róbert Pavlík', points: 727 },
  { name: 'Samuel Michalík', points: 664 },
  { name: 'Tomáš Kráľ', points: 874 },
  { name: 'Urban Wičorek', points: 765 },
  { name: 'Vladimír Jastrabský', points: 886 },
  { name: 'Zdeno Tomčík', points: 547 },
  { name: 'Andrej Jaroš', points: 924 },
  { name: 'Branislav Malina', points: 586 },
  { name: 'Daniel Gajdoš', points: 746 },
  { name: 'Eduard Krúpa', points: 618 },
  { name: 'František Brezina', points: 674 },
  { name: 'Gustáv Stupka', points: 758 },
  { name: 'Henrich Vrana', points: 879 },
  { name: 'Ivan Liska', points: 995 },
  { name: 'Dev Acc', points: 747 },
];

const yearly = [
  { name: 'Adam Novák', points: 2413 },
  { name: 'Boris Kováč', points: 3129 },
  { name: 'Cyril Višňovský', points: 4217 },
  { name: 'Dušan Vojtík', points: 2728 },
  { name: 'Erik Kamenický', points: 3514 },
  { name: 'Filip Levický', points: 4619 },
  { name: 'Gabriel Zelený', points: 3012 },
  { name: 'Henrich Sýkora', points: 3716 },
  { name: 'Igor Varga', points: 4328 },
  { name: 'Jakub Dobrovodský', points: 2915 },
  { name: 'Karol Kozák', points: 4823 },
  { name: 'Lukáš Jankovič', points: 4118 },
  { name: 'Matúš Mazúr', points: 3611 },
  { name: 'Norbert Krištof', points: 2832 },
  { name: 'Oliver Pitoňák', points: 4427 },
  { name: 'Patrik Gregor', points: 4715 },
  { name: 'Róbert Pavlík', points: 3936 },
  { name: 'Samuel Michalík', points: 3421 },
  { name: 'Tomáš Kráľ', points: 4533 },
  { name: 'Urban Wičorek', points: 4029 },
  { name: 'Vladimír Jastrabský', points: 4578 },
  { name: 'Zdeno Tomčík', points: 3219 },
  { name: 'Andrej Jaroš', points: 4832 },
  { name: 'Branislav Malina', points: 3134 },
  { name: 'Daniel Gajdoš', points: 4075 },
  { name: 'Eduard Krúpa', points: 2931 },
  { name: 'František Brezina', points: 3562 },
  { name: 'Gustáv Stupka', points: 3971 },
  { name: 'Henrich Vrana', points: 4526 },
  { name: 'Ivan Liska', points: 4918 },
  { name: 'Dev Acc', points: 3178 },
];

const pltimetable = [
  {
    day: 1,
    subject: 'Supply chain management',
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
    lessonNumber: '2',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 2,
    subject: 'Adaptation in Europe',
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
    lessonNumber: '2',
    time: '13:00',
    marathon: 'prep',
  },
  {
    day: 4,
    subject: 'Balanced logistics',
    lessonNumber: '1',
    time: '11:00',
    marathon: 'logistics',
  },
  {
    day: 4,
    subject: 'Balanced logistics ',
    lessonNumber: '2',
    time: '12:00',
    marathon: 'logistics',
  },
  {
    day: 4,
    subject: 'English',
    lessonNumber: '2',
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
    lessonNumber: '3',
    time: '13:00',
    marathon: 'prep',
  },
];

const MyISMPO = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [lessons, setLessons] = useState(false);
  const [points, setPoints] = useState({});
  const [timetable, setTimetable] = useState({});
  const [montlyPoints, setMonthlyPoints] = useState({});
  const [user, setUser] = useState({});
  const [languageIndex, setLanguageIndex] = useState(0);
  const [language, setLanguage] = useState('pl');
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
    document.title = 'My ISMPO';

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
        'Zadajte e-mailovú adresu, ktorou ste zaregistrovaný na našej platforme!'
      ),
    password: yup
      .string()
      .required('Zadajte heslo, ktoré používate na prihlásenie sa na našu platformu!'),
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
            <UniLoginLogo src={logo} alt="ISMPO logo" />
            <LoginFormTextWSPA>
              Dobrý deň!
              <br />
              Naša webová stránka nie je dostupná bez autorizácie. Prosím, zadajte svoj
              e-mail a heslo.
            </LoginFormTextWSPA>
            <Label>
              <AdminInputISMPO
                type="text"
                name="mail"
                placeholder="Login"
                onBlur={() => setIsUserInfoIncorrect(false)}
              />
              <AdminInputNoteWSPA component="p" name="mail" type="email" />
            </Label>
            <Label>
              <AdminInputISMPO
                type="password"
                name="password"
                placeholder="Password"
                onBlur={() => setIsUserInfoIncorrect(false)}
              />
              <AdminInputNoteWSPA component="p" name="password" />
            </Label>
            <FormBtnISMPO type="submit">
              <FormBtnText> Prihlásiť sa </FormBtnText>
            </FormBtnISMPO>
            <LoginErrorNote
              style={isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }}
            >
              Zadaný e-mail alebo heslo sú nesprávne!
            </LoginErrorNote>
          </LoginForm>
        </Formik>
      ) : (
        <>
          {Object.values(points).length > 0 && (
            <MyISMPOPanel
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

export default MyISMPO;
