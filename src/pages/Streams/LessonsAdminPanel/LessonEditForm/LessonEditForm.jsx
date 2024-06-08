import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';

import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  UsersEditForm,
} from 'pages/Streams/UserAdminPanel/UserAdminPanel.styled';
import { useState } from 'react';
import * as yup from 'yup';

axios.defaults.baseURL = 'https://aggregator-server.onrender.com';

export const LessonEditForm = ({ lessonToEdit, closeEditForm }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialLessonValues = {
    marathonId: lessonToEdit.marathonId,
    lessonId: lessonToEdit.lessonId,
    marathonName: lessonToEdit.marathonName,
    lang: lessonToEdit.lang,
    level: lessonToEdit.level,
    lesson: lessonToEdit.lesson,
    topic: lessonToEdit.topic,
    keysEn: lessonToEdit.keysEn,
    keysUa: lessonToEdit.keysUa,
    pdf: lessonToEdit.pdf.join(','),
    video: lessonToEdit.video.join(','),
  };

  const lessonSchema = yup.object().shape({
    marathonId: yup
      .string()
      .required(
        "marathonId - обов'язкове поле! Значення дивись на платформі в адресному рядку"
      )
      .matches(/^\d{1,7}$/, 'Лише цифри'),
    lessonId: yup
      .string()
      .required(
        "marathonLessonId - обов'язкове поле! Значення дивись на платформі в адресному рядку"
      )
      .matches(/^\d{1,7}$/, 'Лише цифри'),
    marathonName: yup
      .string()
      .required("Назва і номер марафону - обов'язкове поле!"),
    lang: yup.string().required("Мова - обов'язкове поле!"),
    level: yup
      .string()
      .required("Рівень - обов'язкове поле!")
      .matches(/^[A-Za-z0-9]+$/, 'Лише латинські літери'),
    lesson: yup.string().required("Урок - обов'язкове поле!"),
    topic: yup
      .string()
      .required(
        "Тема уроку - обов'язкове поле! Введи теми як граматики, так і словника одним рядком"
      ),
    keysEn: yup
      .string()
      .required(
        "Ключі англійською - обов'язкове поле! Введи переклад тему уроку або її фрагментів англійською"
      ),
    keysUa: yup
      .string()
      .required(
        "Ключі українською - обов'язкове поле! Введи переклад тему уроку або її фрагментів українською"
      ),
    video: yup.string().optional() || yup.array().of(yup.string().optional()),
    pdf: yup.string().optional() || yup.array().of(yup.string().optional()),
  });

  const handleLessonSubmit = async (values, { resetForm }) => {
    console.log(values);
    setIsLoading(isLoading => (isLoading = true));
    values.marathonId = values.marathonId.trim().trimStart();
    values.lessonId = values.lessonId.trim().trimStart();
    values.marathonName = values.marathonName.trim().trimStart();
    values.lang = values.lang.toLowerCase().trim().trimStart();
    values.level = values.level.toLowerCase().trim().trimStart();
    values.lesson = values.lesson.trim().trimStart();
    values.topic = values.topic.trim().trimStart();
    values.keysEn = values.keysEn.toLowerCase().trim().trimStart();
    values.keysUa = values.keysUa.toLowerCase().trim().trimStart();
    values.pdf =
      values.pdf === ''
        ? []
        : [...values.pdf.split(',').map(link => link.trim().trimStart())];

    values.video =
      values.video === ''
        ? []
        : [...values.video.split(',').map(link => link.trim().trimStart())];
    try {
      const response = await axios.put(`/lessons/${lessonToEdit._id}`, values);
      console.log(response);
      resetForm();
      alert('Урок відредаговано');
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
        initialValues={initialLessonValues}
        onSubmit={handleLessonSubmit}
        validationSchema={lessonSchema}
      >
        <UsersEditForm>
          <Label>
            <AdminInput
              type="text"
              name="marathonId"
              placeholder="marathonId"
            />
            <AdminInputNote component="p" name="marathonId" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="lessonId"
              placeholder="marathonLessonId"
            />
            <AdminInputNote component="p" name="lessonId" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="marathonName"
              placeholder="Назва і номер марафону"
            />
            <AdminInputNote component="p" name="marathonName" />
          </Label>
          <Label>
            <AdminInput type="text" name="lang" placeholder="Мова (en/de/pl)" />
            <AdminInputNote component="p" name="lang" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="level"
              placeholder="Рівень (A1/A2/B1/B2)"
            />
            <AdminInputNote component="p" name="level" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="lesson"
              placeholder="Номер уроку (Lesson 12)"
            />
            <AdminInputNote component="p" name="lesson" />
          </Label>
          <Label>
            <AdminInput type="text" name="topic" placeholder="Тема уроку" />
            <AdminInputNote component="p" name="topic" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="keysUa"
              placeholder="Ключові слова українською"
            />
            <AdminInputNote component="p" name="keysUa" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="keysEn"
              placeholder="Ключові слова англійською"
            />
            <AdminInputNote component="p" name="keysEn" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="video"
              placeholder="Внести посилання на відео через кому"
            />
            <AdminInputNote component="p" name="knowledge" />
          </Label>
          <Label>
            <AdminInput
              type="text"
              name="pdf"
              placeholder="Внести посилання на таблиці через кому"
            />
            <AdminInputNote component="p" name="pdf" />
          </Label>
          <AdminFormBtn type="submit">Підтвердити зміни</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
