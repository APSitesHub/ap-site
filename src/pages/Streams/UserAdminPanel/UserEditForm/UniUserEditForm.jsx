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

const translations = {
  pl: {
    namePlaceholder: 'Nazwisko i imię',
    emailPlaceholder: 'Adres e-mail (login)',
    passwordPlaceholder: 'Hasło',
    crmIdPlaceholder: 'ID leada w CRM',
    contactIdPlaceholder: 'ID kontaktu w CRM',
    pointsPlaceholder: 'Punkty',
    pupilIdPlaceholder: 'ID ucznia na platformie',
    universityPlaceholder: 'Uniwersytet',
    groupPlaceholder: 'Grupa',
    universityRequired: 'Uniwersytet - pole obowiązkowe!',
    groupRequired: 'Grupa - pole obowiązkowe!',
    userUpdated: "Użytkownik został zaktualizowany!",
    submitButton: 'Zatwierdź zmiany',
  },
  ua: {
    namePlaceholder: "Прізвище та ім'я",
    emailPlaceholder: 'Адреса електронної пошти (логін)',
    passwordPlaceholder: 'Пароль',
    crmIdPlaceholder: 'ID ліда в CRM',
    contactIdPlaceholder: 'ID контакту в CRM',
    pointsPlaceholder: 'Бали',
    pupilIdPlaceholder: 'ID учня на платформі',
    universityPlaceholder: 'Університет',
    groupPlaceholder: 'Група',
    universityRequired: "Університет - обов'язкове поле!",
    groupRequired: "Група - обов'язкове поле!",
    userUpdated: "Юзера відредаговано!",
    submitButton: 'Підтвердити зміни',
  },
};

export const UniUserEditForm = ({
  lang,
  uni,
  userToEdit,
  updateUser,
  closeEditForm,
  uniOptions,
  groupOptions,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uniValue, setUniValue] = useState(
    uniOptions.find(option => option.value === userToEdit.university)
  );
  const [isUniEmpty, setIsUniEmpty] = useState(false);
  const [groupValue, setGroupValue] = useState(
    userToEdit.group
      ? groupOptions.find(option => option.value === userToEdit.group)
      : '1'
  );
  const [isGroupEmpty, setIsGroupEmpty] = useState(false);
  const selectInputRef = useRef();

  console.log(userToEdit);

  const initialUserValues = {
    crmId: userToEdit.crmId || '',
    contactId: userToEdit.contactId || '',
    name: userToEdit.name,
    mail: userToEdit.mail,
    password: userToEdit.password,
    pupilId: userToEdit.pupilId,
    points: userToEdit.points || '0',
    university: userToEdit.university,
    group: userToEdit.group ? userToEdit.group : '1',
  };

  const usersSchema = yup.object().shape({
    name: yup.string().required(translations[lang]?.namePlaceholder),
    mail: yup.string().required(translations[lang]?.emailPlaceholder),
    password: yup.string().required(translations[lang]?.passwordPlaceholder),
    crmId: yup.string().matches(/^[0-9]*$/, translations[lang]?.crmIdPlaceholder),
    contactId: yup.string().matches(/^[0-9]*$/, translations[lang]?.contactIdPlaceholder),
    pupilId: yup
      .string()
      .min(6, translations[lang]?.pupilIdPlaceholder)
      .max(7, translations[lang]?.pupilIdPlaceholder)
      .matches(/^\d{1,7}$/, translations[lang]?.pupilIdPlaceholder)
      .required(translations[lang]?.pupilIdPlaceholder),
    points: yup.string().matches(/^[0-9]*$/, translations[lang]?.pointsPlaceholder),
  });

  const handleUserSubmit = async (values, { resetForm }) => {
    values.name = values.name.trim().trimStart();
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    values.pupilId = values.pupilId.trim().trimStart();
    values.points = values.points.trim().trimStart();
    values.crmId =
      values.crmId && typeof values.crmId === 'string'
        ? +values.crmId.trim().trimStart()
        : undefined;
    values.contactId =
      values.contactId && typeof values.crmId === 'string'
        ? +values.contactId.trim().trimStart()
        : undefined;
    values.university = uniValue?.value || userToEdit.university;
    values.group = groupValue.value;
    try {
      setIsLoading(isLoading => (isLoading = true));
      const response = await axios.put(`/uniusers/${userToEdit._id}`, values);
      console.log(response);
      resetForm();
      alert(translations[lang]?.userUpdated);
      updateUser(userToEdit._id, values);
      closeEditForm();
    } catch (error) {
      console.error(error);
      alert(translations[lang]?.universityRequired);
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
              placeholder={translations[lang]?.namePlaceholder}
            />
            <AdminInputNote component="p" name="name" />
          </Label>
          <Label>
            <AdminInput
              type="email"
              name="mail"
              placeholder={translations[lang]?.emailPlaceholder}
            />
            <AdminInputNote component="p" name="mail" />
          </Label>
          {!uni && (
            <Label>
              <AdminInput
                type="text"
                name="password"
                placeholder={translations[lang]?.passwordPlaceholder}
              />
              <AdminInputNote component="p" name="password" />
            </Label>
          )}
          {!uni && (
            <Label>
              <AdminInput
                type="text"
                name="crmId"
                placeholder={translations[lang]?.crmIdPlaceholder}
              />
              <AdminInputNote component="p" name="crmId" />
            </Label>
          )}
          {!uni && (
            <Label>
              <AdminInput
                type="text"
                name="contactId"
                placeholder={translations[lang]?.contactIdPlaceholder}
              />
              <AdminInputNote component="p" name="contactId" />
            </Label>
          )}
          <Label>
            <AdminInput
              type="text"
              name="points"
              placeholder={translations[lang]?.pointsPlaceholder}
            />
            <AdminInputNote component="p" name="points" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="pupilId"
              placeholder={translations[lang]?.pupilIdPlaceholder}
            />
            <AdminInputNote component="p" name="pupilId" />
          </Label>
          {uniOptions.length > 0 && (
            <SpeakingLabel>
              {uniValue && uniValue.value && (
                <LabelText>{translations[lang]?.universityPlaceholder}</LabelText>
              )}
              <TeacherLangSelect
                ref={selectInputRef}
                options={uniOptions}
                defaultValue={uniOptions.find(
                  option => option.value === userToEdit.university
                )}
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
                placeholder={translations[lang]?.universityPlaceholder}
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
                <ErrorNote>{translations[lang]?.universityRequired}</ErrorNote>
              )}
            </SpeakingLabel>
          )}
          <SpeakingLabel>
            {groupValue && groupValue.value && (
              <LabelText>{translations[lang]?.groupPlaceholder}</LabelText>
            )}
            <TeacherLangSelect
              ref={selectInputRef}
              options={groupOptions}
              defaultValue={
                userToEdit.group
                  ? groupOptions.find(option => option.value === userToEdit.group)
                  : groupOptions[0]
              }
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
              placeholder={translations[lang]?.groupPlaceholder}
              name="group"
              onBlur={() => {
                !groupValue
                  ? setIsGroupEmpty(empty => (empty = true))
                  : setIsGroupEmpty(empty => (empty = false));
              }}
              onChange={group => {
                setGroupValue(group);
                group?.value && setIsGroupEmpty(empty => (empty = false));
              }}
            />
            {isGroupEmpty && <ErrorNote>{translations[lang]?.groupRequired}</ErrorNote>}
          </SpeakingLabel>
          <AdminFormBtn type="submit">{translations[lang]?.submitButton}</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
