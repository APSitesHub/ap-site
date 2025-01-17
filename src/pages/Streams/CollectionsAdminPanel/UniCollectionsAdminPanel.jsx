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
  LinksForm,
  LoginForm,
} from './CollectionsAdminPanel.styled';
import {
  LinksFieldGroup,
  LinksFieldGroupTitle,
} from '../AdminPanel/AdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const UniCollectionsAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Pl Uni 3D Collections Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/collections', {});
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
      const response = await axios.post('/admins/login/collections', values);
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
  };

  const linksSchema = yup.object().shape({
    pedagogium_logistics: yup.string().optional(),
    pedagogium_prep: yup.string().optional(),
    wstijo_logistics: yup.string().optional(),
    wstijo_prep: yup.string().optional(),
    wsbmir_logistics: yup.string().optional(),
    wsbmir_prep: yup.string().optional(),
  });

  const handleLinksSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    Object.keys(values).forEach(
      key =>
        (values[key] = values[key].replace(
          'width="640" height="480"',
          'width="100%" height="100%"'
        ))
    );

    try {
      const response = await axios.patch('/unicollections', values);
      console.log(response);
      resetForm();
      alert('Коллекції замінилися, молодець');
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
                <LinksFieldGroupTitle>
                  Pedagogium (Wyższa Szkoła Nauk Społecznych)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="pedagogium_logistics"
                    placeholder="Pedagogium Logistics Collection"
                  />
                  <AdminInputNote component="p" name="pedagogium" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="pedagogium_prep"
                    placeholder="Pedagogium Przygotowawczy Kurs Collection"
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
                    placeholder="WSTIJO Logistics Collection"
                  />
                  <AdminInputNote component="p" name="wstijo_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstijo_prep"
                    placeholder="WSTIJO Przygotowawczy Kurs Collection"
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
                    placeholder="WSBMIR Logistics Collection"
                  />
                  <AdminInputNote component="p" name="wsbmir_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wsbmir_prep"
                    placeholder="WSBMIR Przygotowawczy Kurs Collection"
                  />
                  <AdminInputNote component="p" name="wsbmir_prep" />
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

export default UniCollectionsAdminPanel;
