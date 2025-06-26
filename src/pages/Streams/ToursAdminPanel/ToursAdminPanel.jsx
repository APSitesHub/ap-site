import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserDBTable,
  UserDeleteButton,
  UserEditButton,
  UserHeadCell,
  AdminInputNote,
  AdminPanelSection,
  AdminFormBtn,
} from '../UserAdminPanel/UserAdminPanel.styled';
import { TourEditForm } from './TourEditForm';
import { AdminInput, LinksForm, LoginForm } from './ToursAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const ToursAdminPanel = () => {
  const [tours, setTours] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [tourToEdit, setTourToEdit] = useState({});

  useEffect(() => {
    document.title = '3D Tours Admin Panel | AP Education';

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

    const getTours = async () => {
      setIsLoading(isLoading => (isLoading = true));
      try {
        if (isUserAdmin) {
          const response = await axios.get('/tours');
          console.log(61, response);

          setTours(tours => (tours = response.data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getTours();
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

  const initialToursValues = {
    page: '',
    link: '',
  };

  const tourSchema = yup.object().shape({
    page: yup.string().required('Сторінка - обов’язкове поле!'),
    link: yup.string().required('Посилання на тур - обов’язкове поле!'),
  });

  const handleToursSubmit = async (values, { resetForm }) => {
    values.page = values.page.toLowerCase().trim();
    values.link = values.link.trim();
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.post('/tours', values);
      console.log(response);
      resetForm();
      setTours(tours => (tours = [...tours, response.data]));
      alert('Тур додано, молодець');
    } catch (error) {
      console.error(error);
      alert('Щось не прокнуло!');
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const handleEdit = async id => {
    setIsEditFormOpen(true);
    setTourToEdit(tourToEdit => (tourToEdit = tours.find(tour => tour._id === id)));
  };

  const updateTour = (id, values) => {
    const tourToUpdate = tours.find(tour => tour._id === id);
    tourToUpdate.page = values.page;
    tourToUpdate.link = values.link;

    setTours(
      tours =>
        (tours = tours.map((tour, i) =>
          i === tours.findIndex(tour => tour._id === id) ? tourToUpdate : tour
        ))
    );
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
  };

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
    }
  };

  const handleDelete = async id => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.delete(`/tours/${id}`);
      console.log(response);
      alert('Урок видалено');
      setTours(tours => (tours = tours.filter(tour => tour._id !== id)));
    } catch (error) {
      console.error(error);
      alert('Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу');
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
            initialValues={initialToursValues}
            onSubmit={handleToursSubmit}
            validationSchema={tourSchema}
          >
            <LinksForm>
              <Label>
                <AdminInput
                  type="text"
                  name="page"
                  placeholder="Сторінка - все після /teacher/"
                />
                <AdminInputNote component="p" name="page" />
              </Label>
              <Label>
                <AdminInput type="text" name="link" placeholder="Посилання на тур" />
                <AdminInputNote component="p" name="link" />
              </Label>
              <AdminFormBtn type="submit">Додати тур</AdminFormBtn>
            </LinksForm>
          </Formik>
        )}
        {isUserAdmin && tours.length > 0 && (
          <UserDBTable>
            <UserDBCaption>Список уроків на платформі</UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>Сторінка</UserHeadCell>
                <UserHeadCell>Посилання</UserHeadCell>
                <UserHeadCell>Edit</UserHeadCell>
                <UserHeadCell>Delete</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {tours.map(tour => (
                <UserDBRow key={tour._id}>
                  <UserCell>{tour.page}</UserCell>
                  <UserCell>{tour.link}</UserCell>

                  <UserCell>
                    <UserEditButton onClick={() => handleEdit(tour._id)}>
                      Edit
                    </UserEditButton>
                  </UserCell>
                  <UserCell>
                    <UserDeleteButton onClick={() => handleDelete(tour._id)}>
                      Del
                    </UserDeleteButton>
                  </UserCell>
                </UserDBRow>
              ))}
            </tbody>
          </UserDBTable>
        )}
        {isEditFormOpen && (
          <Backdrop onMouseDown={closeEditFormOnClick} id="close-on-click">
            <TourEditForm
              tourToEdit={tourToEdit}
              updateTour={updateTour}
              closeEditForm={closeEditForm}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default ToursAdminPanel;
