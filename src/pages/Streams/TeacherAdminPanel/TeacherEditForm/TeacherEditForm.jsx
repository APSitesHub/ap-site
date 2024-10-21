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
} from '../TeacherAdminPanel.styled';
import { EditFormHeader } from 'pages/TeacherPage/TeacherPage.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TeacherEditForm = ({ teacherToEdit, closeEditForm }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialTeacherValues = {
    name: teacherToEdit.name,
    login: teacherToEdit.login,
    password: teacherToEdit.password,
  };

  const teachersSchema = yup.object().shape({
    name: yup.string().required("Ім'я - обов'язкове поле"),
    login: yup.string().required("Логін - обов'язкове поле!"),
    password: yup.string().required("Пароль - обов'язкове поле!"),
  });

  const handleTeacherSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.name = values.name.trim().trimStart();
    values.login = values.login.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();

    try {
      const response = await axios.put(
        `/teachers/${teacherToEdit._id}`,
        values
      );
      console.log(response);
      resetForm();
      alert('Тічера відредаговано');
      closeEditForm();
    } catch (error) {
      console.error(error);
      alert(
        'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу'
      );
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <Formik
        initialValues={initialTeacherValues}
        onSubmit={handleTeacherSubmit}
        validationSchema={teachersSchema}
      >
        <UsersEditForm>
          <EditFormHeader>{teacherToEdit.name}</EditFormHeader>
          <Label>
            <AdminInput
              type="text"
              name="name"
              placeholder="Прізвище та ім'я"
            />
            <AdminInputNote component="p" name="name" />
          </Label>
          <Label>
            <AdminInput type="text" name="login" placeholder="Логін" />
            <AdminInputNote component="p" name="login" />
          </Label>
          <Label>
            <AdminInput type="text" name="password" placeholder="Пароль" />
            <AdminInputNote component="p" name="password" />
          </Label>
          <AdminFormBtn type="submit">Підтвердити зміни</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
