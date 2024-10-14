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

const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Link Admin Panel | AP Education';

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
    a1free: '',
    a2free: '',
    deutscha0: '',
    deutscha0_2: '',
    deutsch: '',
    deutscha2: '',
    deutschb1: '',
    deutschb2: '',
    deutschfree: '',
    deutscha2free: '',
    polskia0: '',
    polskia0_2: '',
    polski: '',
    polskia2: '',
    polskib1: '',
    polskib2: '',
    polskifree: '',
    a0kids: '',
    a1kids: '',
    a2kids: '',
    b1kids: '',
    b2kids: '',
    c1kids: '',
    b1kidsbeginner: '',
    b2kidsbeginner: '',
    dea1kids: '',
    pla1kids: '',
    a1kidsfree: '',
    dekidsfree: '',
    plkidsfree: '',
    kidspre: '',
    kidsbeg: '',
    kidsmid: '',
    kidshigh: '',
    preschool: '',
    nmt_ukr: '',
    nmt_en: '',
    nmt_math: '',
    nmt_history: '',
    test: '',
  };

  const linksSchema = yup.object().shape({
    a0: yup.string().optional(),
    a0_2: yup.string().optional(),
    a1: yup.string().optional(),
    a2: yup.string().optional(),
    b1: yup.string().optional(),
    b2: yup.string().optional(),
    c1: yup.string().optional(),
    a1free: yup.string().optional(),
    a2free: yup.string().optional(),
    deutscha0: yup.string().optional(),
    deutscha0_2: yup.string().optional(),
    deutsch: yup.string().optional(),
    deutscha2: yup.string().optional(),
    deutschb1: yup.string().optional(),
    deutschb2: yup.string().optional(),
    deutschfree: yup.string().optional(),
    deutscha2free: yup.string().optional(),
    polskia0: yup.string().optional(),
    polskia0_2: yup.string().optional(),
    polski: yup.string().optional(),
    polskia2: yup.string().optional(),
    polskib1: yup.string().optional(),
    polskib2: yup.string().optional(),
    polskifree: yup.string().optional(),
    a0kids: yup.string().optional(),
    a1kids: yup.string().optional(),
    a2kids: yup.string().optional(),
    b1kids: yup.string().optional(),
    b2kids: yup.string().optional(),
    c1kids: yup.string().optional(),
    b1kidsbeginner: yup.string().optional(),
    b2kidsbeginner: yup.string().optional(),
    dea1kids: yup.string().optional(),
    pla1kids: yup.string().optional(),
    a1kidsfree: yup.string().optional(),
    dekidsfree: yup.string().optional(),
    plkidsfree: yup.string().optional(),
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
      const response = await axios.patch('/links', values);
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
          <Formik
            initialValues={initialLinksValues}
            onSubmit={handleLinksSubmit}
            validationSchema={linksSchema}
          >
            <LinksForm>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>English, дорослі</LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="a0" placeholder="A0 link" />
                  <AdminInputNote component="p" name="a0" />
                </Label>
                <Label>
                  <AdminInput type="text" name="a0_2" placeholder="A0_2 link" />
                  <AdminInputNote component="p" name="a0_2" />
                </Label>
                <Label>
                  <AdminInput type="text" name="a1" placeholder="A1 link" />
                  <AdminInputNote component="p" name="a1" />
                </Label>
                <Label>
                  <AdminInput type="text" name="a2" placeholder="A2 link" />
                  <AdminInputNote component="p" name="a2" />
                </Label>
                <Label>
                  <AdminInput type="text" name="b1" placeholder="B1 link" />
                  <AdminInputNote component="p" name="b1" />
                </Label>
                <Label>
                  <AdminInput type="text" name="b2" placeholder="B2 link" />
                  <AdminInputNote component="p" name="b2" />
                </Label>
                <Label>
                  <AdminInput type="text" name="c1" placeholder="C1 link" />
                  <AdminInputNote component="p" name="c1" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="a1free"
                    placeholder="A1 free link"
                  />
                  <AdminInputNote component="p" name="a1free" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="a2free"
                    placeholder="A2 free link"
                  />
                  <AdminInputNote component="p" name="a2free" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>Deutsch</LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutscha0"
                    placeholder="Deutsch A0 link"
                  />
                  <AdminInputNote component="p" name="deutscha0" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutscha0_2"
                    placeholder="Deutsch A0_2 link"
                  />
                  <AdminInputNote component="p" name="deutscha0_2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutsch"
                    placeholder="Deutsch A1 link"
                  />
                  <AdminInputNote component="p" name="deutsch" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutscha2"
                    placeholder="Deutsch A2 link"
                  />
                  <AdminInputNote component="p" name="deutscha2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschb1"
                    placeholder="Deutsch B1 link"
                  />
                  <AdminInputNote component="p" name="deutschb1" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschb2"
                    placeholder="Deutsch B2 link"
                  />
                  <AdminInputNote component="p" name="deutschb2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutschfree"
                    placeholder="Deutsch A1 free link"
                  />
                  <AdminInputNote component="p" name="deutschfree" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="deutscha2free"
                    placeholder="Deutsch A2 free link"
                  />
                  <AdminInputNote component="p" name="deutscha2free" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>Polski</LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskia0"
                    placeholder="Polski A0 link"
                  />
                  <AdminInputNote component="p" name="polskia0" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskia0_2"
                    placeholder="Polski A0_2 link"
                  />
                  <AdminInputNote component="p" name="polskia0_2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polski"
                    placeholder="Polski A1 link"
                  />
                  <AdminInputNote component="p" name="polski" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskia2"
                    placeholder="Polski A2 link"
                  />
                  <AdminInputNote component="p" name="polskia2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskib1"
                    placeholder="Polski B1 link"
                  />
                  <AdminInputNote component="p" name="polskib1" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskib2"
                    placeholder="Polski B2 link"
                  />
                  <AdminInputNote component="p" name="polskib2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="polskifree"
                    placeholder="Polski A1 free link"
                  />
                  <AdminInputNote component="p" name="polskifree" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>Діти</LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="kidspre"
                    placeholder="English Kids PRE link"
                  />
                  <AdminInputNote component="p" name="kidspre" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="kidsbeg"
                    placeholder="English Kids BEG link"
                  />
                  <AdminInputNote component="p" name="kidsbeg" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="kidsmid"
                    placeholder="English Kids MID link"
                  />
                  <AdminInputNote component="p" name="kidsmid" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="kidshigh"
                    placeholder="English Kids HIGH link"
                  />
                  <AdminInputNote component="p" name="kidshigh" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="preschool"
                    placeholder="Preschool Education link"
                  />
                  <AdminInputNote component="p" name="preschool" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="a0kids"
                    placeholder="A0 Kids link"
                  />
                  <AdminInputNote component="p" name="a0kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="a1kids"
                    placeholder="A1 Kids link"
                  />
                  <AdminInputNote component="p" name="a1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="a2kids"
                    placeholder="A2 Kids link"
                  />
                  <AdminInputNote component="p" name="a2kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="b1kids"
                    placeholder="B1 Kids link"
                  />
                  <AdminInputNote component="p" name="b1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="b2kids"
                    placeholder="B2 Kids link"
                  />
                  <AdminInputNote component="p" name="b2kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="c1kids"
                    placeholder="C1 Kids link"
                  />
                  <AdminInputNote component="p" name="c1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="b1kidsbeginner"
                    placeholder="B1 Beginner Kids link"
                  />
                  <AdminInputNote component="p" name="b1kidsbeginner" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="b2kidsbeginner"
                    placeholder="B2 Beginner Kids link"
                  />
                  <AdminInputNote component="p" name="b2kidsbeginner" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="a1kidsfree"
                    placeholder="A1 Kids free link"
                  />
                  <AdminInputNote component="p" name="a1kidsfree" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="dea0kids"
                    placeholder="A0 Kids Deutsch link"
                  />
                  <AdminInputNote component="p" name="dea0kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="dea1kids"
                    placeholder="A1 Kids Deutsch link"
                  />
                  <AdminInputNote component="p" name="dea1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="pla1kids"
                    placeholder="A1 Kids Polski link"
                  />
                  <AdminInputNote component="p" name="pla1kids" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="dekidsfree"
                    placeholder="A1 Kids Deutsch free link"
                  />
                  <AdminInputNote component="p" name="dekidsfree" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="plkidsfree"
                    placeholder="A1 Kids Polski free link"
                  />
                  <AdminInputNote component="p" name="plkidsfree" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>НМТ</LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="nmt_ukr"
                    placeholder="NMT Ukrainian link"
                  />
                  <AdminInputNote component="p" name="nmt_ukr" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="nmt_en"
                    placeholder="NMT English link"
                  />
                  <AdminInputNote component="p" name="nmt_en" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="nmt_math"
                    placeholder="NMT Math link"
                  />
                  <AdminInputNote component="p" name="nmt_math" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="nmt_history"
                    placeholder="NMT History of Ukraine link"
                  />
                  <AdminInputNote component="p" name="nmt_history" />
                </Label>
              </LinksFieldGroup>
              <Label>
                <AdminInput
                  type="text"
                  name="test"
                  placeholder="Test link, do not change"
                />
                <AdminInputNote component="p" name="test" />
              </Label>
              <AdminFormBtn type="submit">Замінити лінки</AdminFormBtn>
            </LinksForm>
          </Formik>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default AdminPanel;
