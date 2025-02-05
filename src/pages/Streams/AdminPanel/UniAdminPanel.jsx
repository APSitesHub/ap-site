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

const UniAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Uni Link Admin Panel | AP Education';

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
    pedagogium_logistics: '',
    pedagogium_prep: '',
    wstijo_logistics: '',
    wstijo_prep: '',
    wsbmir_logistics: '',
    wsbmir_prep: '',
    ewspa_logistics: '',
    ewspa_prep: '',
    merito_logistics: '',
    merito_prep: '',
    wstih_logistics: '',
    wstih_prep: '',
  };

  const linksSchema = yup.object().shape({
    pedagogium_logistics: yup.string().optional(),
    pedagogium_prep: yup.string().optional(),
    wstijo_logistics: yup.string().optional(),
    wstijo_prep: yup.string().optional(),
    wsbmir_logistics: yup.string().optional(),
    wsbmir_prep: yup.string().optional(),
    ewspa_logistics: yup.string().optional(),
    ewspa_prep: yup.string().optional(),
    merito_logistics: yup.string().optional(),
    merito_prep: yup.string().optional(),
    wstih_logistics: yup.string().optional(),
    wstih_prep: yup.string().optional(),
  });

  const handleLinksSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.patch('/unilinks', values);
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
                <LinksFieldGroupTitle>
                  Pedagogium (Wyższa Szkoła Nauk Społecznych)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="pedagogium_logistics"
                    placeholder="Pedagogium Logistics"
                  />
                  <AdminInputNote component="p" name="pedagogium" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="pedagogium_prep"
                    placeholder="Pedagogium Przygotowawczy Kurs"
                  />
                  <AdminInputNote component="p" name="pedagogium" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstijo_logistics"
                    placeholder="WSTIJO Logistics"
                  />
                  <AdminInputNote component="p" name="wstijo_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstijo_prep"
                    placeholder="WSTIJO Przygotowawczy Kurs"
                  />
                  <AdminInputNote component="p" name="wstijo_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wsbmir_logistics"
                    placeholder="WSBMIR Logistics"
                  />
                  <AdminInputNote component="p" name="wsbmir_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wsbmir_prep"
                    placeholder="WSBMIR Przygotowawczy Kurs"
                  />
                  <AdminInputNote component="p" name="wsbmir_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  EWSPA (Wyższa Szkoła Biznesu, Mediów i Reklamy)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="ewspa_logistics"
                    placeholder="EWSPA Logistics"
                  />
                  <AdminInputNote component="p" name="ewspa_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="ewspa_prep"
                    placeholder="EWSPA Przygotowawczy Kurs"
                  />
                  <AdminInputNote component="p" name="ewspa_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  Merito (Uniwersytet WSB Merito Warszawa)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="merito_logistics"
                    placeholder="Merito Logistics"
                  />
                  <AdminInputNote component="p" name="merito_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="merito_prep"
                    placeholder="Merito Preparation Course"
                  />
                  <AdminInputNote component="p" name="merito_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSTiH (Wyższa Szkoła Turystyki i Hotelarstwa w Gdańsku)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstih_logistics"
                    placeholder="WSTiH Logistics"
                  />
                  <AdminInputNote component="p" name="wstih_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstih_prep"
                    placeholder="WSTiH Preparation Course"
                  />
                  <AdminInputNote component="p" name="wstih_prep" />
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

export default UniAdminPanel;
