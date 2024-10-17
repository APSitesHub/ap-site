import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import {
  AdminFormBtn,
  AdminInputNote,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { FormSelect } from 'pages/Streams/TimeTableAdminPanel/TimeTableAdminPanel.styled';
import { UsersEditForm } from 'pages/Streams/UserAdminPanel/UserAdminPanel.styled';
import { useState } from 'react';
import * as yup from 'yup';
import { EditFormHeader, StudentTextArea } from '../TeacherPage.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TeacherPageSpeakingEditForm = ({
  studentToEdit,
  closeCourseLevelEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [temperamentValue, setTemperamentValue] = useState(
    studentToEdit.temperament || ''
  );
  const [successRateValue, setSuccessRateValue] = useState(
    studentToEdit.successRate || ''
  );

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
    feedback: '',
    teacher: localStorage.getItem('teacherName'),
  };

  const studentSchema = yup.object().shape({
    temperament: yup.string(),
    successRate: yup.string(),
    feedback: yup.string(),
    // teacher: yup.string(),
  });

  const handleEditStudentSubmit = async values => {
    values.temperament = temperamentValue;
    values.successRate = successRateValue;
    const scValues = { ...values, crmId: studentToEdit.crmId };

    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.patch(
        `/speakingusers/${studentToEdit.userId}`,
        scValues
      );
      const userResponse = await axios.patch(
        `/users/sc/${studentToEdit.userId}`,
        values
      );
      console.log(response);
      console.log(userResponse);
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
        onSubmit={handleEditStudentSubmit}
        validationSchema={studentSchema}
      >
        <UsersEditForm>
          <EditFormHeader>
            {studentToEdit.name +
              (studentToEdit.age ? ', ' + studentToEdit.age + 'р.' : '')}
          </EditFormHeader>
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
              option => option.value === studentToEdit.successRate
            )}
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
          <Label>
            <StudentTextArea
              type="text"
              name="feedback"
              component="textarea"
              placeholder="Фідбек"
            />
            <AdminInputNote component="p" name="feedback" />
          </Label>
          <AdminFormBtn type="submit">Підтвердити зміни</AdminFormBtn>
        </UsersEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
