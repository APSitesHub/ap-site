import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  UsersEditForm,
} from '../UserAdminPanel.styled';
import {
  ErrorNote,
  TeacherLangSelect,
} from 'pages/Streams/TeacherAdminPanel/TeacherAdminPanel.styled';
import {
  LabelText,
  SpeakingLabel,
} from 'pages/TeacherPage/TeacherPageSpeakingEditForm/TeacherPageSpeakingEditForm.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const UniUserEditForm = ({
  userToEdit,
  updateUser,
  closeEditForm,
  uniOptions,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uniValue, setUniValue] = useState(null);
  const [isUniEmpty, setIsUniEmpty] = useState(false);
  const selectInputRef = useRef();

  const initialUserValues = {
    crmId: userToEdit.crmId || '',
    contactId: userToEdit.contactId || '',
    name: userToEdit.name,
    mail: userToEdit.mail,
    password: userToEdit.password,
    pupilId: userToEdit.pupilId,
    marathonId: userToEdit.marathonId || '',
    university: userToEdit.university,
  };

  const usersSchema = yup.object().shape({
    name: yup
      .string()
      .required(
        "Ім'я - обов'язкове поле, якщо імені з якоїсь причини ми не знаємо, введіть N/A"
      ),
    mail: yup.string().required("Пошта - обов'язкове поле!"),
    password: yup.string().required("Пароль - обов'язкове поле!"),
    crmId: yup.string().matches(/^[0-9]*$/, 'Лише цифри'),
    contactId: yup.string().matches(/^[0-9]*$/, 'Лише цифри'),
    pupilId: yup
      .string()
      .min(6, 'Не менше 6 цифр')
      .max(7, 'Не більше 7 цифр')
      .matches(/^\d{1,7}$/, 'Лише цифри')
      .required("Обов'язкове поле, дивитись на платформі"),
    // marathonId: yup
    //   .string()
    //   .min(4, 'Не менше 4 цифр')
    //   .max(7, 'Не більше 7 цифр')
    //   .matches(/^\d{1,7}$/, 'Лише цифри'),
    // university: yup
    //   .string()
    //   .required("Назва університету - обов'язкове поле, введіть її"),
  });

  const handleUserSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    values.name = values.name.trim().trimStart();
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    values.pupilId = values.pupilId.trim().trimStart();
    values.crmId = values.crmId ? +values.crmId.trim().trimStart() : undefined;
    values.contactId = values.contactId
      ? +values.contactId.trim().trimStart()
      : undefined;
    values.pupilId = values.pupilId.trim().trimStart();
    values.marathonId = uniValue.value;
    values.university = uniValue.label;
    try {
      const response = await axios.put(`/uniusers/${userToEdit._id}`, values);
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
          <SpeakingLabel>
            {uniValue && uniValue.value && <LabelText>Університет</LabelText>}
            <TeacherLangSelect
              ref={selectInputRef}
              options={uniOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '50px',
                  minHeight: '34px',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  position: 'absolute',
                  zIndex: '2',
                  top: '36px',
                }),
                dropdownIndicator: (baseStyles, state) => ({
                  ...baseStyles,
                  padding: '7px',
                }),
              }}
              placeholder="Університет"
              name="uni"
              onBlur={() => {
                !uniValue
                  ? setIsUniEmpty(empty => (empty = true))
                  : setIsUniEmpty(empty => (empty = false));
              }}
              onChange={uni => {
                setUniValue(uni);
                uni?.value && setIsUniEmpty(empty => (empty = false));
              }}
            />
            {isUniEmpty && (
              <ErrorNote> Університет - обов'язкове поле!</ErrorNote>
            )}
          </SpeakingLabel>
          <AdminFormBtn type="submit">Підтвердити зміни</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
