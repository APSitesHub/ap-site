import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  UsersEditForm,
} from '../UserAdminPanel/UserAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TourEditForm = ({ tourToEdit, updateTour, closeEditForm }) => {
  console.log(17, tourToEdit);

  const [isLoading, setIsLoading] = useState(false);

  const initialTourValues = {
    page: tourToEdit.page || '',
    link: tourToEdit.link || '',
  };

  const tourSchema = yup.object().shape({
    page: yup.string().required('Сторінка - обов’язкове поле!'),
    link: yup.string().required('Посилання на тур - обов’язкове поле!'),
  });

  const handleTourSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.page = values.page.toLowerCase().trim();
    values.link = values.link.trim();
    try {
      const response = await axios.patch(`/tours/${tourToEdit._id}`, values);
      console.log(response);
      resetForm();
      alert('Тур відредаговано');
      updateTour(tourToEdit._id, values);
      closeEditForm();
    } catch (error) {
      console.error(error);
      alert('Щось не прокнуло!');
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <Formik
        initialValues={initialTourValues}
        onSubmit={handleTourSubmit}
        validationSchema={tourSchema}
      >
        <UsersEditForm>
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
          <AdminFormBtn type="submit">Підтвердити зміни</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
