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
  levelOptionsForDe,
  courseOptions,
  courseEnglishOptions,
  courseDeutschOptions,
  daysOptions,
  typeOptions,
  packageOptions,
  closeEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [langValue, setLangValue] = useState(lessonToEdit.lang);
  const [levelValue, setLevelValue] = useState(lessonToEdit.level);
  const [courseValue, setCourseValue] = useState(lessonToEdit.course || '');
  const [dayValue, setDayValue] = useState(scheduleToEdit.day);
  const [typeValue, setTypeValue] = useState(scheduleToEdit.type);
  const [packageValue, setPackageValue] = useState(scheduleToEdit.package);

  const initialEditTimetableValues = {
    lang: lessonToEdit.lang,
    level: lessonToEdit.level,
    course: lessonToEdit.course || '',
    day: scheduleToEdit.day,
    type: scheduleToEdit.type,
    package: scheduleToEdit.package,
    time: scheduleToEdit.time,
    lessonNumber: scheduleToEdit.lessonNumber,
    teacher: scheduleToEdit.teacher,
  };

  const timetableSchema = yup.object().shape({
    lang: yup.string(),
    level: yup.string(),
    course: yup.string(),
    day: yup.string(),
    type: yup.string(),
    package: yup.string(),
    time: yup.string(),
    lessonNumber: yup.string(),
    teacher: yup.string(),
  });

  const handleEditTimetableSubmit = async values => {
    values = {
      lang: langValue,
      level: levelValue,
      course: courseValue,
      schedule: [
        {
          day: dayValue,
          type: typeValue,
          package: packageValue,
          time: values.time,
          lessonNumber: values.lessonNumber,
          teacher: values.teacher,
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
              langValue === 'enkids'
                ? levelOptionsWithBeginners
                : langValue === 'de'
                ? levelOptionsForDe
                : levelOptions
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
              ) ||
              levelOptionsForDe.find(
                option => option.value === lessonToEdit.level
              )
            }
            isDisabled
            onChange={level => {
              setLevelValue(level.value);
            }}
          />
          <FormSelect
            options={
              langValue === 'en' || langValue === 'enkids'
                ? courseEnglishOptions
                : langValue === 'de'
                ? courseDeutschOptions
                : courseOptions
            }
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Потік"
            name="course"
            defaultValue={
              courseOptions.find(
                option => option.value === lessonToEdit.course
              ) ||
              courseEnglishOptions.find(
                option => option.value === lessonToEdit.course
              )
            }
            isDisabled
            onChange={course => {
              setCourseValue(course.value);
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
          <Label>
            <AdminInput
              type="text"
              name="lessonNumber"
              placeholder="Номер уроку"
            />
            <AdminInputNote component="p" name="lessonNumber" />
          </Label>
          <Label>
            <AdminInput type="text" name="teacher" placeholder="Викладач" />
            <AdminInputNote component="p" name="teacher" />
          </Label>
          <AdminFormBtn type="submit">Змінити розклад</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
