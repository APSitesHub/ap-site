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
} from '../UserAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const UserEditForm = ({ userToEdit, updateUser, closeEditForm }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialUserValues = {
    crmId: userToEdit.crmId || '',
    contactId: userToEdit.contactId || '',
    name: userToEdit.name,
    mail: userToEdit.mail,
    zoomMail: userToEdit.zoomMail || '',
    password: userToEdit.password,
    pupilId: userToEdit.pupilId,
    marathonNumber: userToEdit.marathonNumber || '',
    adult: userToEdit.adult,
    age: userToEdit.age,
    lang: userToEdit.lang,
    course: userToEdit.course,
    package: userToEdit.package,
    knowledge: userToEdit.knowledge,
    manager: userToEdit.manager,
  };

  const usersSchema = yup.object().shape({
    name: yup
      .string()
      .required(
        "Ім'я - обов'язкове поле, якщо імені з якоїсь причини ми не знаємо, введіть N/A"
      ),
    mail: yup.string().required("Пошта - обов'язкове поле!"),
    zoomMail: yup.string(),
    password: yup.string().required("Пароль - обов'язкове поле!"),
    crmId: yup.string().matches(/^[0-9]*$/, 'Лише цифри'),
    contactId: yup.string().matches(/^[0-9]*$/, 'Лише цифри'),
    pupilId: yup
      .string()
      .min(6, 'Не менше 6 цифр')
      .max(7, 'Не більше 7 цифр')
      .matches(/^\d{1,7}$/, 'Лише цифри')
      .required("Обов'язкове поле, дивитись на платформі"),
    marathonNumber: yup
      .string()
      .max(1, 'Не більше 1 цифри')
      .matches(/[12]/, 'Лише цифри 1 або 2'),
    age: yup
      .string()
      .required(
        "Вік - обов'язкове поле, якщо віку з якоїсь причини ми не знаємо, введіть N/A"
      ),
    lang: yup
      .string()
      .optional()
      .matches(/^[A-Za-z0-9/]+$/, 'Лише латинські літери'),
    course: yup
      .string()
      .required(
        "Обов'язкове поле, для тестових юзерів або нерозподілених користувачів введіть 0"
      ),
    package: yup.string().optional(),
    // .matches(/^[A-Za-z0-9/]+$/, 'Лише латинські літери'),
    knowledge: yup
      .string()
      .optional()
      .matches(/^[A-Za-z0-9/]+$/, 'Лише латинські літери'),
    manager: yup
      .string()
      .required("Менеджер - обов'язкове поле, введіть прізвище"),
  });

  const handleUserSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.name = values.name.trim().trimStart();
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.zoomMail = values.zoomMail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    values.pupilId = values.pupilId.trim().trimStart();
    values.marathonNumber = values.marathonNumber.trim().trimStart();
    values.crmId =
      values.crmId && typeof values.crmId !== 'number'
        ? +values.crmId.trim().trimStart()
        : typeof values.crmId === 'number'
        ? values.crmId
        : undefined;
    values.contactId =
      values.contactId && typeof values.contactId !== 'number'
        ? +values.contactId.trim().trimStart()
        : typeof values.contactId === 'number'
        ? values.contactId
        : undefined;
    values.age = values.age.trim().trimStart();
    values.adult = +values.age > 18 ? true : false;
    values.lang = values.lang.toLowerCase().trim().trimStart();
    values.package =
      values.package === undefined
        ? ''
        : values.package.toLowerCase().trim().trimStart();
    values.course =
      values.course === undefined
        ? ''
        : values.course.toLowerCase().trim().trimStart();
    values.knowledge =
      values.knowledge === undefined
        ? ''
        : values.knowledge.toLowerCase().trim().trimStart();
    values.manager = values.manager.toLowerCase().trim().trimStart();
    try {
      const response = await axios.put(`/users/${userToEdit._id}`, values);
      console.log(response);
      resetForm();
      alert('Юзера відредаговано');
      updateUser(userToEdit._id, values);
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
        initialValues={initialUserValues}
        onSubmit={handleUserSubmit}
        validationSchema={usersSchema}
      >
        <UsersEditForm>
          <Label>
            <AdminInput
              type="text"
              name="name"
              placeholder="Прізвище та ім'я"
            />
            <AdminInputNote component="p" name="name" />
          </Label>
          <Label>
            <AdminInput
              type="email"
              name="mail"
              placeholder="Електронна пошта (логін)"
            />
            <AdminInputNote component="p" name="mail" />
          </Label>
          <Label>
            <AdminInput type="email" name="zoomMail" placeholder="Zoom-пошта" />
            <AdminInputNote component="p" name="zoomMail" />
          </Label>
          <Label>
            <AdminInput type="text" name="password" placeholder="Пароль" />
            <AdminInputNote component="p" name="password" />
          </Label>
          <Label>
            <AdminInput type="text" name="crmId" placeholder="ID ліда в CRM" />
            <AdminInputNote component="p" name="crmId" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="contactId"
              placeholder="ID контакту в CRM"
            />
            <AdminInputNote component="p" name="contactId" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="pupilId"
              placeholder="ID учня на платформі"
            />
            <AdminInputNote component="p" name="pupilId" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="marathonNumber"
              placeholder="№ марафону на платформі"
            />
            <AdminInputNote component="p" name="marathonNumber" />
          </Label>
          <Label>
            <AdminInput type="text" name="age" placeholder="Вік" />
            <AdminInputNote component="p" name="age" />
          </Label>
          <Label>
            <AdminInput type="text" name="lang" placeholder="Мова" />
            <AdminInputNote component="p" name="lang" />
          </Label>
          <Label>
            <AdminInput type="text" name="course" placeholder="Потік" />
            <AdminInputNote component="p" name="course" />
          </Label>
          <Label>
            <AdminInput type="text" name="package" placeholder="Пакет послуг" />
            <AdminInputNote component="p" name="package" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="knowledge"
              placeholder="Рівень знань"
            />
            <AdminInputNote component="p" name="knowledge" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="manager"
              placeholder="Прізвище відповідального менеджера"
            />
            <AdminInputNote component="p" name="manager" />
          </Label>
          <AdminFormBtn type="submit">Підтвердити зміни</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
