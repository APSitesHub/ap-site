import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { A02KahootForm } from './A02KahootForm';
import { A0KahootForm } from './A0KahootForm';
import { A0KidsKahootForm } from './A0KidsKahootForm';
import { A1FreeKahootForm } from './A1FreeKahootForm';
import { A1KahootForm } from './A1KahootForm';
import { A1KidsFreeKahootForm } from './A1KidsFreeKahootForm';
import { A1KidsKahootForm } from './A1KidsKahootForm';
import { A2FreeKahootForm } from './A2FreeKahootForm';
import { A2KahootForm } from './A2KahootForm';
import { A2KidsKahootForm } from './A2KidsKahootForm';
import { B1KahootForm } from './B1KahootForm';
import { B1KidsBeginnerKahootForm } from './B1KidsBeginnerKahootForm';
import { B1KidsKahootForm } from './B1KidsKahootForm';
import { B2KahootForm } from './B2KahootForm';
import { B2KidsBeginnerKahootForm } from './B2KidsBeginnerKahootForm';
import { B2KidsKahootForm } from './B2KidsKahootForm';
import { C1KahootForm } from './C1KahootForm';
import { C1KidsKahootForm } from './C1KidsKahootForm';
import { DeutschA02KahootForm } from './DeutschA02KahootForm';
import { DeutschA0KahootForm } from './DeutschA0KahootForm';
import { DeutschA2FreeKahootForm } from './DeutschA2FreeKahootForm';
import { DeutschA2KahootForm } from './DeutschA2KahootForm';
import { DeutschB1KahootForm } from './DeutschB1KahootForm';
import { DeutschB2KahootForm } from './DeutschB2KahootForm';
import { DeutschFreeKahootForm } from './DeutschFreeKahootForm';
import { DeutschKahootForm } from './DeutschKahootForm';
import { DeutschKidsFreeKahootForm } from './DeutschKidsFreeKahootForm';
import { DeutschKidsKahootForm } from './DeutschKidsKahootForm';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  KahootFormBox,
  KahootLvlBtn,
  KahootLvlBtnBox,
  LoginForm,
} from './KahootAdminPanel.styled';
import { KidsBEGKahootForm } from './KidsBEGKahootForm';
import { KidsHIGHKahootForm } from './KidsHIGHKahootForm';
import { KidsMIDKahootForm } from './KidsMIDKahootForm';
import { KidsPREKahootForm } from './KidsPREKahootForm';
import { NMTEnKahootForm } from './NMTEnKahootForm';
import { NMTHistoryKahootForm } from './NMTHistoryKahootForm';
import { NMTMathKahootForm } from './NMTMathKahootForm';
import { NMTUkrKahootForm } from './NMTUkrKahootForm';
import { PolskiA02KahootForm } from './PolskiA02KahootForm';
import { PolskiA0KahootForm } from './PolskiA0KahootForm';
import { PolskiA2KahootForm } from './PolskiA2KahootForm';
import { PolskiB1KahootForm } from './PolskiB1KahootForm';
import { PolskiB2KahootForm } from './PolskiB2KahootForm';
import { PolskiFreeKahootForm } from './PolskiFreeKahootForm';
import { PolskiKahootForm } from './PolskiKahootForm';
import { PolskiKidsFreeKahootForm } from './PolskiKidsFreeKahootForm';
import { PolskiKidsKahootForm } from './PolskiKidsKahootForm';
import { PreschoolEdKahootForm } from './PreschoolEdKahootForm';
import { TestKahootForm } from './TestKahootForm';
import { TrendetsKahootForm } from './TrendetsKahootForm';
import { TrialsDeKahootForm } from './TrialsDeKahootForm';
import { TrialsEngKahootForm } from './TrialsEngKahootForm';
import { TrialsKidsKahootForm } from './TrialsKidsKahootForm';
import { TrialsPlKahootForm } from './TrialsPlKahootForm';
import { DeutschKidsA0KahootForm } from './DeutschKidsA0KahootForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const KahootAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [levels, setLevels] = useState([]);
  const destination = '/kahoots';

  useEffect(() => {
    document.title = 'Kahoot Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/kahoot/', {});
          console.log(res);
          setIsUserAdmin(isAdmin => (isAdmin = true));
          setAuthToken(res.data.newToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();
  }, [isUserAdmin]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const handleBtnClick = lvl => {
    levels.includes(lvl)
      ? setLevels(levels => [...levels].filter(level => level !== lvl))
      : setLevels(levels => [...levels, lvl]);
  };

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.post('/admins/login/kahoot', values);
      setAuthToken(response.data.token);
      setIsUserAdmin(isAdmin => (isAdmin = true));
      localStorage.setItem('isAdmin', true);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <AdminPanelSection>
        {!isUserAdmin && (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <Label>
                <AdminInput type="text" name="login" placeholder="Login" />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Залогінитись</AdminFormBtn>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && (
          <KahootLvlBtnBox>
            <KahootLvlBtn onClick={() => handleBtnClick('a0')}>A0</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('a0_2')}>
              A0_2
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('a1')}>A1</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('a2')}>A2</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('b1')}>B1</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('b2')}>B2</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('c1')}>C1</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('a1free')}>
              A1 Free
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('a2free')}>
              A2 Free
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('de-a0')}>
              DE A0
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('de-a0_2')}>
              DE A0_2
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('de')}>DE</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('de-a2')}>
              DE A2
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('de-b1')}>
              DE B1
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('de-b2')}>
              DE B2
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('defree')}>
              DE Free
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('de-a2free')}>
              DE A2 Free
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('pl-a0')}>
              PL A0
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('pl-a0_2')}>
              PL A0_2
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('pl')}>PL</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('pl-a2')}>
              PL A2
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('pl-b1')}>
              PL B1
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('pl-b2')}>
              PL B2
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('plfree')}>
              PL Free
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('trial-en')}>
              Trial EN
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('trial-kids')}>
              Trial Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('trial-de')}>
              Trial DE
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('trial-pl')}>
              Trial PL
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('a0kids')}>
              A0 Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('a1kids')}>
              A1 Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('a1kidsfree')}>
              A1 Kids Free
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('a2kids')}>
              A2 Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('b1kids')}>
              B1 Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('b2kids')}>
              B2 Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('c1kids')}>
              C1 Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('b1kidsbeginner')}>
              B1 Kids Beginner
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('b2kidsbeginner')}>
              B2 Kids Beginner
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('dea0kids')}>
              De A0 Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('dea1kids')}>
              De A1 Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('pla1kids')}>
              Pl A1 Kids
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('dekidsfree')}>
              De Kids Free
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('plkidsfree')}>
              Pl Kids Free
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('preschool')}>
              Дошкільна освіта
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('kidspre')}>
              Kids PRE
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('kidsbeg')}>
              Kids BEG
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('kidsmid')}>
              Kids MID
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('kidshigh')}>
              Kids HIGH
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('nmt_ukr')}>
              НМТ Укр
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('nmt_en')}>
              НМТ Англ
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('nmt_math')}>
              НМТ Математика
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('nmt_history')}>
              НМТ Історія
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('test')}>
              Test
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('trendets')}>
              Trendets
            </KahootLvlBtn>
          </KahootLvlBtnBox>
        )}
        <KahootFormBox>
          {levels.includes('a0') && <A0KahootForm destination={destination} />}
          {levels.includes('a0_2') && (
            <A02KahootForm destination={destination} />
          )}
          {levels.includes('a1') && <A1KahootForm destination={destination} />}
          {levels.includes('a2') && <A2KahootForm destination={destination} />}
          {levels.includes('b1') && <B1KahootForm destination={destination} />}
          {levels.includes('b2') && <B2KahootForm destination={destination} />}
          {levels.includes('c1') && <C1KahootForm destination={destination} />}
          {levels.includes('a1free') && (
            <A1FreeKahootForm destination={destination} />
          )}
          {levels.includes('a2free') && (
            <A2FreeKahootForm destination={destination} />
          )}
          {levels.includes('de-a0') && (
            <DeutschA0KahootForm destination={destination} />
          )}
          {levels.includes('de-a0_2') && (
            <DeutschA02KahootForm destination={destination} />
          )}
          {levels.includes('de') && (
            <DeutschKahootForm destination={destination} />
          )}
          {levels.includes('de-a2') && (
            <DeutschA2KahootForm destination={destination} />
          )}
          {levels.includes('de-b1') && (
            <DeutschB1KahootForm destination={destination} />
          )}
          {levels.includes('de-b2') && (
            <DeutschB2KahootForm destination={destination} />
          )}
          {levels.includes('defree') && (
            <DeutschFreeKahootForm destination={destination} />
          )}
          {levels.includes('de-a2free') && (
            <DeutschA2FreeKahootForm destination={destination} />
          )}
          {levels.includes('pl-a0') && (
            <PolskiA0KahootForm destination={destination} />
          )}
          {levels.includes('pl-a0_2') && (
            <PolskiA02KahootForm destination={destination} />
          )}
          {levels.includes('pl') && (
            <PolskiKahootForm destination={destination} />
          )}
          {levels.includes('pl-a2') && (
            <PolskiA2KahootForm destination={destination} />
          )}
          {levels.includes('pl-b1') && (
            <PolskiB1KahootForm destination={destination} />
          )}
          {levels.includes('pl-b2') && (
            <PolskiB2KahootForm destination={destination} />
          )}
          {levels.includes('plfree') && (
            <PolskiFreeKahootForm destination={destination} />
          )}
          {levels.includes('trial-en') && (
            <TrialsEngKahootForm destination={destination} />
          )}
          {levels.includes('trial-kids') && (
            <TrialsKidsKahootForm destination={destination} />
          )}
          {levels.includes('trial-de') && (
            <TrialsDeKahootForm destination={destination} />
          )}
          {levels.includes('trial-pl') && (
            <TrialsPlKahootForm destination={destination} />
          )}
          {levels.includes('a0kids') && (
            <A0KidsKahootForm destination={destination} />
          )}
          {levels.includes('a1kids') && (
            <A1KidsKahootForm destination={destination} />
          )}
          {levels.includes('a2kids') && (
            <A2KidsKahootForm destination={destination} />
          )}
          {levels.includes('b1kids') && (
            <B1KidsKahootForm destination={destination} />
          )}
          {levels.includes('b2kids') && (
            <B2KidsKahootForm destination={destination} />
          )}
          {levels.includes('c1kids') && (
            <C1KidsKahootForm destination={destination} />
          )}
          {levels.includes('b1kidsbeginner') && (
            <B1KidsBeginnerKahootForm destination={destination} />
          )}
          {levels.includes('b2kidsbeginner') && (
            <B2KidsBeginnerKahootForm destination={destination} />
          )}
          {levels.includes('dea0kids') && (
            <DeutschKidsA0KahootForm destination={destination} />
          )}
          {levels.includes('dea1kids') && (
            <DeutschKidsKahootForm destination={destination} />
          )}
          {levels.includes('pla1kids') && (
            <PolskiKidsKahootForm destination={destination} />
          )}
          {levels.includes('a1kidsfree') && (
            <A1KidsFreeKahootForm destination={destination} />
          )}
          {levels.includes('dekidsfree') && (
            <DeutschKidsFreeKahootForm destination={destination} />
          )}
          {levels.includes('plkidsfree') && (
            <PolskiKidsFreeKahootForm destination={destination} />
          )}
          {levels.includes('preschool') && (
            <PreschoolEdKahootForm destination={destination} />
          )}
          {levels.includes('kidspre') && (
            <KidsPREKahootForm destination={destination} />
          )}
          {levels.includes('kidsbeg') && (
            <KidsBEGKahootForm destination={destination} />
          )}
          {levels.includes('kidsmid') && (
            <KidsMIDKahootForm destination={destination} />
          )}
          {levels.includes('kidshigh') && (
            <KidsHIGHKahootForm destination={destination} />
          )}
          {levels.includes('nmt_ukr') && (
            <NMTUkrKahootForm destination={destination} />
          )}
          {levels.includes('nmt_en') && (
            <NMTEnKahootForm destination={destination} />
          )}
          {levels.includes('nmt_math') && (
            <NMTMathKahootForm destination={destination} />
          )}
          {levels.includes('nmt_history') && (
            <NMTHistoryKahootForm destination={destination} />
          )}
          {levels.includes('test') && (
            <TestKahootForm destination={destination} />
          )}
          {levels.includes('trendets') && (
            <TrendetsKahootForm destination={destination} />
          )}
        </KahootFormBox>
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};
