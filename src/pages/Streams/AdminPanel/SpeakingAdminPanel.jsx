import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  LinksFieldGroup,
  LinksFieldGroupTitle,
  LinksForm,
  LoginForm,
} from './AdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const SpeakingAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Speaking Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/', {});
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

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.post('/admins/login', values);
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

  const initialLinksValues = {
    a0: '',
    a0_2: '',
    a1: '',
    a2: '',
    b1: '',
    b2: '',
    c1: '',
    deutscha0: '',
    deutscha0_2: '',
    deutsch: '',
    deutscha2: '',
    deutschb1: '',
    deutschb1_1: '',
    deutschb1_2: '',
    deutschb2: '',
    deutschb2_1: '',
    deutschb2_2: '',
    deutschb2_3: '',
    deutschc1: '',
    polskia0: '',
    polskia0_2: '',
    polski: '',
    polskia2: '',
    polskib1: '',
    polskib2: '',
    polskic1: '',
    a0kids: '',
    a1kids: '',
    a2kids: '',
    b1kids: '',
    b2kids: '',
    c1kids: '',
    b1kidsbeginner: '',
    b2kidsbeginner: '',
    dea0kids: '',
    dea1kids: '',
    dea2kids: '',
    deb1kids: '',
    pla1kids: '',
    pla2kids: '',
    kidspre: '',
    kidsbeg: '',
    kidsmid: '',
    kidshigh: '',
    preschool: '',
    nmt_ukr: '',
    nmt_en: '',
    nmt_math: '',
    nmt_history: '',
  };

  const linksSchema = yup.object().shape({
    a0: yup.string().optional(),
    a0_2: yup.string().optional(),
    a1: yup.string().optional(),
    a2: yup.string().optional(),
    b1: yup.string().optional(),
    b2: yup.string().optional(),
    c1: yup.string().optional(),
    deutscha0: yup.string().optional(),
    deutscha0_2: yup.string().optional(),
    deutsch: yup.string().optional(),
    deutscha2: yup.string().optional(),
    deutschb1: yup.string().optional(),
    deutschb1_1: yup.string().optional(),
    deutschb1_2: yup.string().optional(),
    deutschb2: yup.string().optional(),
    deutschb2_1: yup.string().optional(),
    deutschb2_2: yup.string().optional(),
    deutschb2_3: yup.string().optional(),
    deutschc1: yup.string().optional(),
    polskia0: yup.string().optional(),
    polskia0_2: yup.string().optional(),
    polski: yup.string().optional(),
    polskia2: yup.string().optional(),
    polskib1: yup.string().optional(),
    polskib2: yup.string().optional(),
    polskic1: yup.string().optional(),
    a0kids: yup.string().optional(),
    a1kids: yup.string().optional(),
    a2kids: yup.string().optional(),
    b1kids: yup.string().optional(),
    b2kids: yup.string().optional(),
    c1kids: yup.string().optional(),
    b1kidsbeginner: yup.string().optional(),
    b2kidsbeginner: yup.string().optional(),
    dea0kids: yup.string().optional(),
    dea1kids: yup.string().optional(),
    dea2kids: yup.string().optional(),
    deb1kids: yup.string().optional(),
    pla1kids: yup.string().optional(),
    pla2kids: yup.string().optional(),
    kidspre: yup.string().optional(),
    kidsbeg: yup.string().optional(),
    kidsmid: yup.string().optional(),
    kidshigh: yup.string().optional(),
    preschool: yup.string().optional(),
    nmt_ukr: yup.string().optional(),
    nmt_en: yup.string().optional(),
    nmt_math: yup.string().optional(),
    nmt_history: yup.string().optional(),
  });

  const handleLinksSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.patch('/speakings', values);
      console.log(response);
      resetForm();
      alert('Лінки замінилися, молодець');
    } catch (error) {
      console.error(error);
      alert('Щось не прокнуло!');
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
                <AdminInput type="password" name="password" placeholder="Password" />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Залогінитись</AdminFormBtn>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && (
          <Formik
            initialValues={initialLinksValues}
            onSubmit={handleLinksSubmit}
            validationSchema={linksSchema}
          >
            <LinksForm>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>English, дорослі</LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="a0" placeholder="A0 speaking link" />
                  <AdminInputNote component="p" name="a0" />
                </Label>
                <Label>
                  <AdminInput type="text" name="a0_2" placeholder="A0_2 speaking link" />
                  <AdminInputNote component="p" name="a0_2" />
                </Label>
                <Label>
                  <AdminInput type="text" name="a1" placeholder="A1 speaking link" />
                  <AdminInputNote component="p" name="a1" />
                </Label>
                <Label>
                  <AdminInput type="text" name="a2" placeholder="A2 speaking link" />
                  <AdminInputNote component="p" name="a2" />
                </Label>
                <Label>
                  <AdminInput type="text" name="b1" placeholder="B1 speaking link" />
                  <AdminInputNote component="p" name="b1" />
                </Label>
                <Label>
                  <AdminInput type="text" name="b2" placeholder="B2 speaking link" />
                  <AdminInputNote component="p" name="b2" />
                </Label>
                <Label>
                  <AdminInput type="text" name="c1" placeholder="C1 speaking link" />
                  <AdminInputNote component="p" name="c1" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle> Deutsch</LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutscha0"
                    placeholder="Deutsch A0 speaking link"
                  />
                  <AdminInputNote component="p" name="deutscha0" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutscha0_2"
                    placeholder="Deutsch A0_2 speaking link"
                  />
                  <AdminInputNote component="p" name="deutscha0_2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutsch"
                    placeholder="Deutsch A1 speaking link"
                  />
                  <AdminInputNote component="p" name="deutsch" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutscha2"
                    placeholder="Deutsch A2 speaking link"
                  />
                  <AdminInputNote component="p" name="deutscha2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschb1"
                    placeholder="Deutsch B1 speaking link"
                  />
                  <AdminInputNote component="p" name="deutschb1" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschb1_1"
                    placeholder="Deutsch B1_1 speaking link"
                  />
                  <AdminInputNote component="p" name="deutschb1_1" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschb1_2"
                    placeholder="Deutsch B1_2 speaking link"
                  />
                  <AdminInputNote component="p" name="deutschb1_2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschb2"
                    placeholder="Deutsch B2 speaking link"
                  />
                  <AdminInputNote component="p" name="deutschb2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschb2_1"
                    placeholder="Deutsch B2_1 speaking link"
                  />
                  <AdminInputNote component="p" name="deutschb2_1" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschb2_2"
                    placeholder="Deutsch B2_2 speaking link"
                  />
                  <AdminInputNote component="p" name="deutschb2_2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschb2_3"
                    placeholder="Deutsch B2_3 speaking link"
                  />
                  <AdminInputNote component="p" name="deutschb2_3" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschc1"
                    placeholder="Deutsch C1 speaking link"
                  />
                  <AdminInputNote component="p" name="deutschc1" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>Polski</LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskia0"
                    placeholder="Polski A0 speaking link"
                  />
                  <AdminInputNote component="p" name="polskia0" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskia0_2"
                    placeholder="Polski A0_2 speaking link"
                  />
                  <AdminInputNote component="p" name="polskia0_2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polski"
                    placeholder="Polski A1 speaking link"
                  />
                  <AdminInputNote component="p" name="polski" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskia2"
                    placeholder="Polski A2 speaking link"
                  />
                  <AdminInputNote component="p" name="polskia2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskib1"
                    placeholder="Polski B1 speaking link"
                  />
                  <AdminInputNote component="p" name="polskib1" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskib2"
                    placeholder="Polski B2 speaking link"
                  />
                  <AdminInputNote component="p" name="polskib2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskic1"
                    placeholder="Polski C1 speaking link"
                  />
                  <AdminInputNote component="p" name="polskic1" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>Діти</LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="kidspre"
                    placeholder="English PRE speaking link"
                  />
                  <AdminInputNote component="p" name="kidspre" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="kidsbeg"
                    placeholder="English BEG speaking link"
                  />
                  <AdminInputNote component="p" name="kidsbeg" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="kidsmid"
                    placeholder="English MID speaking link"
                  />
                  <AdminInputNote component="p" name="kidsmid" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="kidshigh"
                    placeholder="English HIGH speaking link"
                  />
                  <AdminInputNote component="p" name="kidshigh" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="preschool"
                    placeholder="Preschool Education speaking link"
                  />
                  <AdminInputNote component="p" name="preschool" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="a0kids"
                    placeholder="A0 Kids speaking link"
                  />
                  <AdminInputNote component="p" name="a0kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="a1kids"
                    placeholder="A1 Kids speaking link"
                  />
                  <AdminInputNote component="p" name="a1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="a2kids"
                    placeholder="A2 Kids speaking link"
                  />
                  <AdminInputNote component="p" name="a2kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="b1kids"
                    placeholder="B1 Kids speaking link"
                  />
                  <AdminInputNote component="p" name="b1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="b2kids"
                    placeholder="B2 Kids speaking link"
                  />
                  <AdminInputNote component="p" name="b2kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="c1kids"
                    placeholder="C1 Kids speaking link"
                  />
                  <AdminInputNote component="p" name="c1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="b1kidsbeginner"
                    placeholder="B1 Beginner Kids speaking link"
                  />
                  <AdminInputNote component="p" name="b1kidsbeginner" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="b2kidsbeginner"
                    placeholder="B2 Beginner Kids speaking link"
                  />
                  <AdminInputNote component="p" name="b2kidsbeginner" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="dea0kids"
                    placeholder="A0 Kids Deutsch speaking link"
                  />
                  <AdminInputNote component="p" name="dea0kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="dea1kids"
                    placeholder="A1 Kids Deutsch speaking link"
                  />
                  <AdminInputNote component="p" name="dea1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="dea2kids"
                    placeholder="A2 Kids Deutsch speaking link"
                  />
                  <AdminInputNote component="p" name="dea2kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deb1kids"
                    placeholder="B1 Kids Deutsch speaking link"
                  />
                  <AdminInputNote component="p" name="deb1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="pla1kids"
                    placeholder="A1 Kids Polski speaking link"
                  />
                  <AdminInputNote component="p" name="pla1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="pla2kids"
                    placeholder="A2 Kids Polski speaking link"
                  />
                  <AdminInputNote component="p" name="pla2kids" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>НМТ</LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="nmt_ukr"
                    placeholder="NMT Ukrainian speaking link"
                  />
                  <AdminInputNote component="p" name="nmt_ukr" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="nmt_en"
                    placeholder="NMT English speaking link"
                  />
                  <AdminInputNote component="p" name="nmt_en" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="nmt_math"
                    placeholder="NMT Math speaking link"
                  />
                  <AdminInputNote component="p" name="nmt_math" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="nmt_history"
                    placeholder="NMT History of Ukraine speaking link"
                  />
                  <AdminInputNote component="p" name="nmt_history" />
                </Label>
              </LinksFieldGroup>
              <AdminFormBtn type="submit">Замінити лінки</AdminFormBtn>
            </LinksForm>
          </Formik>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default SpeakingAdminPanel;
