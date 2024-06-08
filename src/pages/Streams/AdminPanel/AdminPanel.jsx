import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
// eslint-disable-next-line
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  LinksForm,
  LoginForm,
} from './AdminPanel.styled';

axios.defaults.baseURL = 'https://aggregator-server.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const AdminPanel = () => {
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
    a1: '',
    a2: '',
    b1: '',
    b2: '',
    a1free: '',
    a2free: '',
    deutscha0: '',
    deutsch: '',
    deutscha2: '',
    deutschfree: '',
    deutscha2free: '',
    polskia0: '',
    polski: '',
    polskia2: '',
    polskifree: '',
    trials: '',
    trials_kids: '',
    trials_de: '',
    trials_pl: '',
    a0kids: '',
    a1kids: '',
    a2kids: '',
    b1kids: '',
    b2kids: '',
    b1kidsbeginner: '',
    a1kidsfree: '',
    test: '',
  };

  const linksSchema = yup.object().shape({
    a0: yup.string().optional(),
    a1: yup.string().optional(),
    a2: yup.string().optional(),
    b1: yup.string().optional(),
    b2: yup.string().optional(),
    a1free: yup.string().optional(),
    a2free: yup.string().optional(),
    deutscha0: yup.string().optional(),
    deutsch: yup.string().optional(),
    deutscha2: yup.string().optional(),
    deutschfree: yup.string().optional(),
    deutscha2free: yup.string().optional(),
    polskia0: yup.string().optional(),
    polski: yup.string().optional(),
    polskia2: yup.string().optional(),
    polskifree: yup.string().optional(),
    trials: yup.string().optional(),
    trials_kids: yup.string().optional(),
    trials_de: yup.string().optional(),
    trials_pl: yup.string().optional(),
    a0kids: yup.string().optional(),
    a1kids: yup.string().optional(),
    a2kids: yup.string().optional(),
    b1kids: yup.string().optional(),
    b2kids: yup.string().optional(),
    b1kidsbeginner: yup.string().optional(),
    a1kidsfree: yup.string().optional(),
    test: yup.string().optional(),
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
              <Label>
                <AdminInput type="text" name="a0" placeholder="A0 link" />
                <AdminInputNote component="p" name="a0" />
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
                <AdminInput type="text" name="a1free" placeholder="A1 free link" />
                <AdminInputNote component="p" name="a1free" />
              </Label>
              <Label>
                <AdminInput type="text" name="a2free" placeholder="A2 free link" />
                <AdminInputNote component="p" name="a2free" />
              </Label>
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
                  name="polskifree"
                  placeholder="Polski A1 free link"
                />
                <AdminInputNote component="p" name="polskifree" />
              </Label> 
              <Label>
                <AdminInput
                  type="text"
                  name="trials"
                  placeholder="Trials English link"
                />
                <AdminInputNote component="p" name="trials" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="trials_kids"
                  placeholder="Trials Kids link"
                />
                <AdminInputNote component="p" name="trials_kids" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="trials_de"
                  placeholder="Trials Deutsch link"
                />
                <AdminInputNote component="p" name="trials_de" />
              </Label>
              <Label>
                <AdminInput
                  type="text"
                  name="trials_pl"
                  placeholder="Trials Polski link"
                />
                <AdminInputNote component="p" name="trials_pl" />
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
                  name="b1kidsbeginner"
                  placeholder="B1 Beginner Kids link"
                />
                <AdminInputNote component="p" name="b1kidsbeginner" />
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
