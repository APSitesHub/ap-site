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
} from '../../UserAdminPanel/UserAdminPanel.styled';
import { FormSelect } from '../TimeTableAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TimeTableEditForm = ({
  lessonToEdit,
  scheduleToEdit,
  languageOptions,
  levelOptions,
  levelOptionsWithBeginners,
  daysOptions,
  typeOptions,
  packageOptions,
  closeEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [langValue, setLangValue] = useState(lessonToEdit.lang);
  const [levelValue, setLevelValue] = useState(lessonToEdit.level);
  const [dayValue, setDayValue] = useState(scheduleToEdit.day);
  const [typeValue, setTypeValue] = useState(scheduleToEdit.type);
  const [packageValue, setPackageValue] = useState(scheduleToEdit.package);

  const initialEditTimetableValues = {
    lang: lessonToEdit.lang,
    level: lessonToEdit.level,
    day: scheduleToEdit.day,
    type: scheduleToEdit.type,
    package: scheduleToEdit.package,
    time: scheduleToEdit.time,
  };

  const timetableSchema = yup.object().shape({
    lang: yup.string(),
    level: yup.string(),
    day: yup.string(),
    type: yup.string(),
    package: yup.string(),
    time: yup.string(),
  });

  const handleEditTimetableSubmit = async values => {
    values = {
      lang: langValue,
      level: levelValue,
      schedule: [
        {
          day: dayValue,
          type: typeValue,
          package: packageValue,
          time: values.time,
        },
      ],
    };

    console.log(values);
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.put(`/timetable/${lessonToEdit._id}`, {
        lessonId: scheduleToEdit._id,
        body: values,
      });
      console.log(response);
      closeEditForm();
      alert('Урок відредаговано');
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
        initialValues={initialEditTimetableValues}
        onSubmit={handleEditTimetableSubmit}
        validationSchema={timetableSchema}
      >
        <UsersEditForm>
          <FormSelect
            options={languageOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Мова"
            name="lang"
            defaultValue={languageOptions.find(
              option => option.value === lessonToEdit.lang
            )}
            isDisabled
            onChange={lang => {
              setLangValue(lang.value);
            }}
          />
          <FormSelect
            options={
              langValue !== 'enkids' ? levelOptions : levelOptionsWithBeginners
            }
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Рівень"
            name="level"
            defaultValue={
              levelOptions.find(
                option => option.value === lessonToEdit.level
              ) ||
              levelOptionsWithBeginners.find(
                option => option.value === lessonToEdit.level
              )
            }
            isDisabled
            onChange={level => {
              setLevelValue(level.value);
            }}
          />
          <FormSelect
            options={daysOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="День"
            name="day"
            defaultValue={daysOptions.find(
              option => +option.value === scheduleToEdit.day
            )}
            onChange={day => {
              setDayValue(day.value);
            }}
          />
          <FormSelect
            options={typeOptions}
            styles={{
              control: baseStyles => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Тип заняття"
            name="type"
            defaultValue={typeOptions.find(
              option => option.value === scheduleToEdit.type
            )}
            onChange={type => {
              setTypeValue(type.value);
            }}
          />
          <FormSelect
            options={packageOptions}
            styles={{
              control: baseStyles => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Найнижчий доступний пакет"
            name="package"
            defaultValue={packageOptions.find(
              option => option.value === scheduleToEdit.package
            )}
            onChange={pack => {
              setPackageValue(pack.value);
            }}
          />
          <Label>
            <AdminInput type="text" name="time" placeholder="Час" />
            <AdminInputNote component="p" name="time" />
          </Label>
          <AdminFormBtn type="submit">Змінити розклад</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
