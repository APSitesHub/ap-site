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

export const UniTimeTableEditForm = ({
  lessonToEdit,
  scheduleToEdit,
  uniOptions,
  pedagogiumMarathonOptions,
  wstijoMarathonOptions,
  wsbmirMarathonOptions,
  ewspaMarathonOptions,
  meritoMarathonOptions,
  wstihMarathonOptions,
  wskmMarathonOptions,
  wssipMarathonOptions,
  wspaMarathonOptions,
  answpMarathonOptions,
  wseMarathonOptions,
  sswMarathonOptions,
  mansMarathonOptions,
  ahnsMarathonOptions,
  daysOptions,
  closeEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uniValue, setUniValue] = useState(lessonToEdit.university || '');
  const [marathonValue, setMarathonValue] = useState(lessonToEdit.marathon || '');
  const [dayValue, setDayValue] = useState(scheduleToEdit.day);

  const initialEditTimetableValues = {
    university: lessonToEdit.university,
    marathon: lessonToEdit.marathon,
    day: scheduleToEdit.day,
    time: scheduleToEdit.time,
    lessonNumber: scheduleToEdit.lessonNumber,
    topic: scheduleToEdit.topic,
  };

  const timetableSchema = yup.object().shape({
    university: yup.string(),
    marathon: yup.string(),
    day: yup.string(),
    time: yup.string(),
    lessonNumber: yup.string(),
    topic: yup.string(),
  });

  const handleEditTimetableSubmit = async values => {
    values = {
      university: uniValue,
      marathon: marathonValue,
      schedule: [
        {
          day: dayValue,
          type: 'Webinar',
          time: values.time,
          lessonNumber: values.lessonNumber,
          topic: values.topic,
        },
      ],
    };

    console.log(values);
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.put(`/unitimetable/${lessonToEdit._id}`, {
        lessonId: scheduleToEdit._id,
        body: values,
      });
      console.log(response);
      closeEditForm();
      alert('Урок відредаговано');
    } catch (error) {
      console.error(error);
      alert('Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу');
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
            options={uniOptions}
            defaultValue={uniOptions.find(
              option => option.value === lessonToEdit.university
            )}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Університет"
            name="uni"
            isDisabled
            onChange={uni => {
              setUniValue(uni.value);
            }}
          />
          {console.log(121, uniValue)}
          <FormSelect
            options={
              uniValue.includes('WSTIJO')
                ? wstijoMarathonOptions
                : uniValue.includes('WSBMIR')
                ? wsbmirMarathonOptions
                : uniValue.includes('EWSPA')
                ? ewspaMarathonOptions
                : uniValue.includes('Merito')
                ? meritoMarathonOptions
                : uniValue.includes('WSTiH')
                ? wstihMarathonOptions
                : uniValue.includes('WSKM')
                ? wskmMarathonOptions
                : uniValue.includes('WSSiP')
                ? wssipMarathonOptions
                : uniValue.includes('WSPA')
                ? wspaMarathonOptions
                : uniValue.includes('ANSWP')
                ? answpMarathonOptions
                : uniValue.includes('WSE')
                ? wseMarathonOptions
                : uniValue.includes('SSW')
                ? sswMarathonOptions
                : uniValue.includes('MANS')
                ? mansMarathonOptions
                : uniValue.includes('AHNS')
                ? ahnsMarathonOptions
                : pedagogiumMarathonOptions
            }
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Марафон"
            name="marathon"
            defaultValue={
              wstijoMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              pedagogiumMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              wsbmirMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              ewspaMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              meritoMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              wstihMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              wskmMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              wssipMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              wspaMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              answpMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              wseMarathonOptions.find(option => option.value === lessonToEdit.marathon) ||
              sswMarathonOptions.find(option => option.value === lessonToEdit.marathon) ||
              mansMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              ahnsMarathonOptions.find(option => option.value === lessonToEdit.marathon)
            }
            isDisabled
            onChange={marathon => {
              setMarathonValue(marathon.value);
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
          <Label>
            <AdminInput type="text" name="time" placeholder="Час" />
            <AdminInputNote component="p" name="time" />
          </Label>
          <Label>
            <AdminInput type="text" name="lessonNumber" placeholder="Номер уроку" />
            <AdminInputNote component="p" name="lessonNumber" />
          </Label>
          <Label>
            <AdminInput type="text" name="topic" placeholder="Тема уроку" />
            <AdminInputNote component="p" name="topic" />
          </Label>
          <AdminFormBtn type="submit">Змінити розклад</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
