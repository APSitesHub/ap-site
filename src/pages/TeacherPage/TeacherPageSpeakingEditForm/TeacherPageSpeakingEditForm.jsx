import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { FormSelect } from 'pages/Streams/TimeTableAdminPanel/TimeTableAdminPanel.styled';
import { UsersEditForm } from 'pages/Streams/UserAdminPanel/UserAdminPanel.styled';
import { AdminFormBtn } from 'pages/Streams/AdminPanel/AdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TeacherPageSpeakingEditForm = ({
  studentToEdit,
  closeCourseLevelEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [temperamentValue, setTemperamentValue] = useState(studentToEdit.temperament || '');
  const [successRateValue, setSuccessRateValue] = useState(studentToEdit.successRate || '');

  console.log(studentToEdit);

  const successRateOptions = [
    {
      label: 'Сильний',
      value: 'good',
    },
    {
      label: 'Середній',
      value: 'mid',
    },
    {
      label: 'Слабкий',
      value: 'bad',
    },
  ];

  const temperamentOptions = [
    {
      label: 'Екстраверт',
      value: 'extro',
    },
    {
      label: 'Інтроверт',
      value: 'intro',
    },
  ];

  const initialEditStudentValues = {
    temperament: studentToEdit.temperament || '',
    successRate: studentToEdit.successRate || '',
    feedback: studentToEdit.feedback || '',
  };

  const studentSchema = yup.object().shape({
    temperament: yup.string(),
    successRate: yup.string(),
    feedback: yup.string(),
  });

  const handleEditTimetableSubmit = async values => {
    values = {
      temperament: temperamentValue,
      successRate: successRateValue,
    };

    console.log(values);
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.patch(
        `/timetable/course/${studentToEdit._id}`,
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
        initialValues={initialEditStudentValues}
        onSubmit={handleEditTimetableSubmit}
        validationSchema={studentSchema}
      >
        <UsersEditForm>
          <FormSelect
            options={successRateOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Успішність"
            name="successRate"
            defaultValue={successRateOptions.find(
              option => option.value === studentToEdit.lang
            )}
            isDisabled
            onChange={successRate => {
              setSuccessRateValue(successRate.value);
            }}
          />
          <FormSelect
            options={temperamentOptions}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'none',
                borderRadius: '0px',
              }),
            }}
            placeholder="Темперамент"
            name="temperament"
            defaultValue={temperamentOptions.find(
              option => option.value === studentToEdit.temperament
            )}
            onChange={temperament => {
              setTemperamentValue(temperament.value);
            }}
          />
          <AdminFormBtn type="submit">Змінити юзера</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
