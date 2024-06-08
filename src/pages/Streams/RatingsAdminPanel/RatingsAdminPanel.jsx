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
  AdminTextArea,
  LinksForm,
  LoginForm,
} from './RatingsAdminPanel.styled';

axios.defaults.baseURL = 'https://aggregator-server.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const RatingsAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Ratings Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/users', {});
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
      const response = await axios.post('/admins/login/users', values);
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

  const initialRatingsValues = {
    period: 'all',
    rating: '',
  };

  const initialMonthlyRatingsValues = {
    period: 'monthly',
    rating: '',
  };

  const ratingsSchema = yup.object().shape({
    rating: yup.string().required('Внеси бали!'),
  });

  const handleRatingsSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.rating = JSON.parse(values.rating);

    try {
      console.log(values);
      const response = await axios.patch(`/ratings`, values);
      console.log(response);
      resetForm();
      alert('Рейтинги замінилися, молодець');
    } catch (error) {
      console.error(error);
      alert('Щось не прокнуло!');
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const handleMonthlyRatingsSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.rating = JSON.parse(values.rating);

    try {
      console.log(values);
      const response = await axios.patch('/ratings', values);
      console.log(response);
      resetForm();
      alert('Рейтинги замінилися, молодець');
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
            initialValues={initialRatingsValues}
            onSubmit={handleRatingsSubmit}
            validationSchema={ratingsSchema}
          >
            <LinksForm>
              <Label>
                <AdminTextArea
                  type="text"
                  name="rating"
                  component="textarea"
                  placeholder="Бали всіх-всіх-всіх за все-все-все"
                />
                <AdminInputNote component="p" name="rating" />
              </Label>
              <AdminFormBtn type="submit">
                Оновити загальний рейтинг
              </AdminFormBtn>
            </LinksForm>
          </Formik>
        )}
        {isUserAdmin && (
          <Formik
            initialValues={initialMonthlyRatingsValues}
            onSubmit={handleMonthlyRatingsSubmit}
            validationSchema={ratingsSchema}
          >
            <LinksForm>
              <Label>
                <AdminTextArea
                  type="text"
                  name="rating"
                  component="textarea"
                  placeholder="Бали всіх-всіх-всіх за місяць-місяць-місяць"
                />
                <AdminInputNote component="p" name="rating" />
              </Label>
              <AdminFormBtn type="submit">
                Оновити місячний рейтинг
              </AdminFormBtn>
            </LinksForm>
          </Formik>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};
