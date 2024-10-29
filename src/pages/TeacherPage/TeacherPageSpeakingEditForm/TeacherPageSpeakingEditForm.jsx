import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import {
  AdminFormBtn,
  AdminInputNote,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useState } from 'react';
import * as yup from 'yup';
import { EditFormHeader, StudentTextArea } from '../TeacherPage.styled';
import {
  LabelText,
  SpeakingLabel,
  SpeakingSelect,
  StyledDatePicker,
  UserSpeakingEditForm,
} from './TeacherPageSpeakingEditForm.styled';

import 'react-datepicker/dist/react-datepicker.css';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TeacherPageSpeakingEditForm = ({
  currentUser,
  studentToEdit,
  updateFeedback,
  closeCourseLevelEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [temperamentValue, setTemperamentValue] = useState(
    studentToEdit.temperament || ''
  );
  const [successRateValue, setSuccessRateValue] = useState(
    studentToEdit.successRate || ''
  );
  const [grammarValue, setGrammarValue] = useState(studentToEdit.grammar || '');
  const [lexisValue, setLexisValue] = useState(studentToEdit.lexis || '');
  const [speakingValue, setSpeakingValue] = useState(
    studentToEdit.speaking || ''
  );
  const [listeningValue, setListeningValue] = useState(
    studentToEdit.listening || ''
  );
  const [activityValue, setActivityValue] = useState(
    studentToEdit.Activity || ''
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

  const grammarOptions = [
    {
      label: 'Дуже добре',
      value: 3,
    },
    {
      label: 'Добре',
      value: 2,
    },
    {
      label: 'Потребує покращення',
      value: 1,
    },
  ];

  const lexisOptions = [
    {
      label: 'Дуже добре',
      value: 3,
    },
    {
      label: 'Добре',
      value: 2,
    },
    {
      label: 'Потребує покращення',
      value: 1,
    },
  ];

  const speakingOptions = [
    {
      label: 'Дуже добре',
      value: 3,
    },
    {
      label: 'Добре',
      value: 2,
    },
    {
      label: 'Потребує покращення',
      value: 1,
    },
  ];

  const listeningOptions = [
    {
      label: 'Дуже добре',
      value: 3,
    },
    {
      label: 'Добре',
      value: 2,
    },
    {
      label: 'Потребує покращення',
      value: 1,
    },
  ];

  const activityOptions = [
    {
      label: 'Дуже добре',
      value: 3,
    },
    {
      label: 'Добре',
      value: 2,
    },
    {
      label: 'Потребує покращення',
      value: 1,
    },
  ];

  const initialEditStudentValues = {
    temperament: studentToEdit.temperament || '',
    successRate: studentToEdit.successRate || '',
    grammar: studentToEdit.grammar || '',
    lexis: studentToEdit.lexis || '',
    speaking: studentToEdit.speaking || '',
    listening: studentToEdit.listening || '',
    activity: studentToEdit.activity || '',
    feedback: '',
  };

  const studentSchema = yup.object().shape({
    temperament: yup.string(),
    successRate: yup.string(),
    grammar: yup.number(),
    lexis: yup.number(),
    speaking: yup.number(),
    listening: yup.number(),
    activity: yup.number(),
    feedback: yup.string(),
  });

  const handleEditStudentSubmit = async values => {
    console.log(values);

    values.temperament = temperamentValue;
    values.successRate = successRateValue;
    values.grammar = grammarValue;
    values.lexis = lexisValue;
    values.speaking = speakingValue;
    values.listening = listeningValue;
    values.activity = activityValue;
    values.feedback = `${currentUser.name},
${new Date().toLocaleString('uk-UA', { timeZone: '+03:00' })}:
${values.feedback}`;
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
      updateFeedback(studentToEdit._id, values);
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
        <UserSpeakingEditForm>
          <EditFormHeader id="focus">
            {studentToEdit.name +
              (studentToEdit.age ? ', ' + studentToEdit.age + 'р.' : '')}
          </EditFormHeader>
          <SpeakingLabel>
            <LabelText>Оберіть дату заняття</LabelText>
            <StyledDatePicker
              selected={startDate}
              dateFormat="dd.MM.yyyy"
              onChange={date => setStartDate(date)}
              calendarStartDay={1}
              shouldCloseOnSelect={true}
            />
          </SpeakingLabel>
          <SpeakingLabel>
            {successRateValue && <LabelText>Успішність</LabelText>}
            <SpeakingSelect
              options={successRateOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '0px',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  position: 'absolute',
                  zIndex: '2',
                  top: '36px'
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
          </SpeakingLabel>
          <SpeakingLabel>
            {temperamentValue && <LabelText>Темперамент</LabelText>}
            <SpeakingSelect
              options={temperamentOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '0px',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  position: 'absolute',
                  zIndex: '2',
                  top: '36px'
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
          </SpeakingLabel>
          <SpeakingLabel>
            {grammarValue && <LabelText>Граматика</LabelText>}
            <SpeakingSelect
              options={grammarOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '0px',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  position: 'absolute',
                  zIndex: '2',
                  top: '36px'
                }),
              }}
              placeholder="Граматика"
              name="grammar"
              defaultValue={grammarOptions.find(
                option => option.value === studentToEdit.grammar
              )}
              onChange={grammar => {
                setGrammarValue(grammar.value);
              }}
            />
          </SpeakingLabel>
          <SpeakingLabel>
            {lexisValue && <LabelText>Лексика</LabelText>}
            <SpeakingSelect
              options={lexisOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '0px',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  position: 'absolute',
                  zIndex: '2',
                  top: '36px'
                }),
              }}
              placeholder="Лексика"
              name="lexis"
              defaultValue={lexisOptions.find(
                option => option.value === studentToEdit.lexis
              )}
              onChange={lexis => {
                setLexisValue(lexis.value);
              }}
            />
          </SpeakingLabel>
          <SpeakingLabel>
            {speakingValue && <LabelText>Говоріння/вимова</LabelText>}
            <SpeakingSelect
              options={speakingOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '0px',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  position: 'absolute',
                  zIndex: '2',
                  top: '36px'
                }),
              }}
              placeholder="Говоріння/вимова"
              name="speaking"
              defaultValue={speakingOptions.find(
                option => option.value === studentToEdit.speaking
              )}
              onChange={speaking => {
                setSpeakingValue(speaking.value);
              }}
            />
          </SpeakingLabel>
          <SpeakingLabel>
            {listeningValue && <LabelText>Слухання</LabelText>}
            <SpeakingSelect
              options={listeningOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '0px',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  position: 'absolute',
                  zIndex: '2',
                  top: '36px'
                }),
              }}
              placeholder="Слухання"
              name="listening"
              defaultValue={listeningOptions.find(
                option => option.value === studentToEdit.listening
              )}
              onChange={listening => {
                setListeningValue(listening.value);
              }}
            />
          </SpeakingLabel>
          <SpeakingLabel>
            {activityValue && <LabelText>Активність</LabelText>}
            <SpeakingSelect
              options={activityOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '0px',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  position: 'absolute',
                  zIndex: '2',
                  top: '36px'
                }),
              }}
              placeholder="Активність на уроці"
              name="activity"
              defaultValue={activityOptions.find(
                option => option.value === studentToEdit.activity
              )}
              onChange={activity => {
                setActivityValue(activity.value);
              }}
            />
          </SpeakingLabel>
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
        </UserSpeakingEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
