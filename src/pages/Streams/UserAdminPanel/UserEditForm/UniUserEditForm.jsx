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
    name: yup
      .string()
      .required(
        "Imię - pole obowiązkowe, jeśli z jakiegoś powodu nie znamy imienia, wpisz N/A"
      ),
    mail: yup.string().required("Poczta - pole obowiązkowe!"),
    password: yup.string().required("Hasło - pole obowiązkowe!"),
    crmId: yup.string().matches(/^[0-9]*$/, 'Tylko cyfry'),
    contactId: yup.string().matches(/^[0-9]*$/, 'Tylko cyfry'),
    pupilId: yup
      .string()
      .min(6, 'Nie mniej niż 6 cyfr')
      .max(7, 'Nie więcej niż 7 cyfr')
      .matches(/^\d{1,7}$/, 'Tylko cyfry')
      .required("Pole obowiązkowe, patrz na platformie"),
    points: yup.string().matches(/^[0-9]*$/, 'Tylko cyfry'),
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
      alert('Użytkownik został zaktualizowany');
      updateUser(userToEdit._id, values);
      closeEditForm();
    } catch (error) {
      console.error(error);
      alert('Wystąpił problem - naciśnij F12, zrób zrzut ekranu konsoli, wyślij do Kirila');
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
            <AdminInput type="text" name="name" placeholder="Nazwisko i imię" />
            <AdminInputNote component="p" name="name" />
          </Label>
          <Label>
            <AdminInput type="email" name="mail" placeholder="Adres e-mail (login)" />
            <AdminInputNote component="p" name="mail" />
          </Label>
          {/* <Label>
            <AdminInput type="text" name="password" placeholder="Hasło" />
            <AdminInputNote component="p" name="password" />
          </Label> */}
          {/* <Label>
            <AdminInput type="text" name="crmId" placeholder="ID leada w CRM" />
            <AdminInputNote component="p" name="crmId" />
          </Label> */}
          {/* <Label>
            <AdminInput type="text" name="contactId" placeholder="ID kontaktu w CRM" />
            <AdminInputNote component="p" name="contactId" />
          </Label> */}
          <Label>
            <AdminInput type="text" name="points" placeholder="Punkty" />
            <AdminInputNote component="p" name="points" />
          </Label>
          <Label>
            <AdminInput type="text" name="pupilId" placeholder="ID ucznia na platformie" />
            <AdminInputNote component="p" name="pupilId" />
          </Label>
          {uniOptions.length > 0 && (
            <SpeakingLabel>
              {uniValue && uniValue.value && <LabelText>Uniwersytet</LabelText>}
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
                placeholder="Uniwersytet"
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
              {isUniEmpty && <ErrorNote> Uniwersytet - pole obowiązkowe!</ErrorNote>}
            </SpeakingLabel>
          )}
          <SpeakingLabel>
            {groupValue && groupValue.value && <LabelText>Grupa</LabelText>}
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
              placeholder="Grupa"
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
            {isGroupEmpty && <ErrorNote> Grupa - pole obowiązkowe!</ErrorNote>}
          </SpeakingLabel>
          <AdminFormBtn type="submit">Zatwierdź zmiany</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
