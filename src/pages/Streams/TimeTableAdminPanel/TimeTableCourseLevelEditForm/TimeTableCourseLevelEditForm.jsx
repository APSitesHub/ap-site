import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  UsersEditForm,
} from '../../UserAdminPanel/UserAdminPanel.styled';
import { FormSelect } from '../TimeTableAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TimeTableCourseLevelEditForm = ({
  lessonToEdit,
  languageOptions,
  levelOptions,
  levelOptionsWithBeginners,
  levelOptionsForDe,
  courseOptions,
  courseEnglishOptions,
  courseDeutschOptions,
  closeCourseLevelEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [langValue, setLangValue] = useState(lessonToEdit.lang);
  const [levelValue, setLevelValue] = useState(lessonToEdit.level);
  const [courseValue, setCourseValue] = useState(lessonToEdit.course || '');

  console.log(lessonToEdit);

  const initialEditTimetableValues = {
    lang: lessonToEdit.lang,
    level: lessonToEdit.level,
    course: lessonToEdit.course || '',
  };

  const timetableSchema = yup.object().shape({
    lang: yup.string(),
    level: yup.string(),
    course: yup.string(),
  });

  const handleEditTimetableSubmit = async values => {
    values = {
      lang: langValue,
      level: levelValue,
      course: courseValue,
    };

    console.log(values);
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.patch(
        `/timetable/course/${lessonToEdit._id}`,
        values
      );
      console.log(response);
      closeCourseLevelEditForm();
      alert('Відредаговано');
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
              ) ||
              courseDeutschOptions.find(
                option => option.value === lessonToEdit.course
              )
            }
            onChange={course => {
              setCourseValue(course.value);
            }}
          />
          <AdminFormBtn type="submit">Змінити рівень/потік</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
