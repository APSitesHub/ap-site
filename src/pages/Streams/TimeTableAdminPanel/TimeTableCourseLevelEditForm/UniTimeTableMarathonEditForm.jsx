import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { AdminFormBtn, UsersEditForm } from '../../UserAdminPanel/UserAdminPanel.styled';
import { FormSelect } from '../TimeTableAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const UniTimeTableMarathonEditForm = ({
  lessonToEdit,
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
  closeMarathonEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uniValue, setUniValue] = useState(lessonToEdit.university || '');
  const [marathonValue, setMarathonValue] = useState(lessonToEdit.marathon || '');

  console.log(lessonToEdit);

  const initialEditTimetableValues = {
    university: lessonToEdit.university,
    marathon: lessonToEdit.marathon || '',
  };

  const timetableSchema = yup.object().shape({
    university: yup.string(),
    marathon: yup.string(),
  });

  const handleEditTimetableSubmit = async values => {
    values = {
      university: uniValue,
      marathon: marathonValue,
    };

    console.log(values);
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.patch(
        `/unitimetable/marathon/${lessonToEdit._id}`,
        values
      );
      console.log(response);
      closeMarathonEditForm();
      alert('Відредаговано');
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
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Університет"
            name="uni"
            defaultValue={uniOptions.find(
              option => option.value === lessonToEdit.university
            )}
            isDisabled
            onChange={uni => {
              setUniValue(uni.value);
            }}
          />
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
              pedagogiumMarathonOptions.find(
                option => option.value === lessonToEdit.marathon
              ) ||
              wstijoMarathonOptions.find(
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
            onChange={marathon => {
              setMarathonValue(marathon.value);
            }}
          />

          <AdminFormBtn type="submit">Змінити марафон</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
