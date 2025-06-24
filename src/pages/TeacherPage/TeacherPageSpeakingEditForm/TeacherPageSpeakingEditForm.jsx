import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { EditFormHeader, StudentTextArea } from '../TeacherPage.styled';
import {
  LabelDatePickerText,
  LabelText,
  SpeakingFormBtn,
  SpeakingLabel,
  SpeakingSelect,
  StudentDateInputNote,
  StudentTextAreaNote,
  StyledDatePicker,
  UserSpeakingEditForm,
} from './TeacherPageSpeakingEditForm.styled';

import 'react-datepicker/dist/react-datepicker.css';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const TeacherPageSpeakingEditForm = ({
  currentUser,
  studentToEdit,
  updateFeedback,
  closeStudentEditForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(undefined);
  const [temperamentValue, setTemperamentValue] = useState('');
  const [successRateValue, setSuccessRateValue] = useState('');
  const [grammarValue, setGrammarValue] = useState('');
  const [lexisValue, setLexisValue] = useState('');
  const [speakingValue, setSpeakingValue] = useState('');
  const [listeningValue, setListeningValue] = useState('');
  const [activityValue, setActivityValue] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [errors, setErrors] = useState({
    startDate: false,
    temperament: false,
    successRate: false,
    grammar: false,
    lexis: false,
    speaking: false,
    listening: false,
    activity: false,
    grade: false,
  });

  const successRateOptions = [
    {
      label: 'Сильний',
      value: 'good',
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

  const gradesOptions = Array.from({ length: 10 }, (_, i) => i + 1).map(i => ({
    label: i,
    value: i,
  }));

  const initialEditStudentValues = {
    temperament: '',
    successRate: '',
    grammar: '',
    lexis: '',
    speaking: '',
    listening: '',
    activity: '',
    feedback: '',
    grade: '',
  };

  const studentSchema = yup.object().shape({
    temperament: yup.string(),
    successRate: yup.string(),
    grammar: yup.number(),
    lexis: yup.number(),
    speaking: yup.number(),
    listening: yup.number(),
    activity: yup.number(),
    feedback: yup.string().required("Фідбек - обов'язкове поле, без нього ніяк"),
    grade: yup.number(),
  });

  const validations = [
    { key: 'startDate', value: startDate },
    { key: 'temperament', value: temperamentValue },
    { key: 'successRate', value: successRateValue },
    { key: 'grammar', value: grammarValue },
    { key: 'lexis', value: lexisValue },
    { key: 'speaking', value: speakingValue },
    { key: 'listening', value: listeningValue },
    { key: 'activity', value: activityValue },
    { key: 'grade', value: gradeValue },
  ];

  const handleEditStudentSubmit = async values => {
    console.log(169, values);
    console.log(startDate);

    const hasErrors = validations
      .map(field => {
        if (!field.value) {
          setErrors(errors => ({ ...errors, [field.key]: true }));
          return true;
        }
        return false;
      })
      .some(error => error);

    if (hasErrors) {
      return;
    }

    const scValues = {
      crmId: studentToEdit.crmId,
      temperament: temperamentValue,
      successRate: successRateValue,
      feedback: {
        text: `${currentUser.name} залишає відгук за заняття ${startDate.getDate()}.${
          startDate.getMonth() + 1 < 10
            ? '0' + (startDate.getMonth() + 1)
            : startDate.getMonth() + 1
        }.${startDate.getFullYear()}:
${new Date().toLocaleString('uk-UA', { timeZone: '+02:00' })}:
${values.feedback}`,
        date: startDate,
        activity: activityValue,
        grammar: grammarValue,
        lexis: lexisValue,
        speaking: speakingValue,
        listening: listeningValue,
        grade: gradeValue,
      },
    };
    console.log('scValues', scValues);

    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.patch(
        `speakingusers/${studentToEdit.userId}`,
        scValues
      );
      // const userResponse = await axios.patch(`/users/sc/${studentToEdit.userId}`, values);
      console.log(response);
      // console.log(userResponse);
      closeStudentEditForm();
      alert('Відредаговано');
      updateFeedback(studentToEdit._id, scValues);
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
            <LabelDatePickerText>Оберіть дату заняття</LabelDatePickerText>
          </SpeakingLabel>
          <StyledDatePicker
            className={errors.startDate ? 'error' : undefined}
            selected={startDate}
            dateFormat="dd.MM.yyyy"
            onChange={date => {
              setStartDate(date);
              date && setErrors(errors => (errors = { ...errors, startDate: false }));
            }}
            calendarStartDay={1}
            shouldCloseOnSelect={true}
            maxDate={new Date()}
          />
          {errors.startDate && (
            <StudentDateInputNote> Обов'язкове поле! </StudentDateInputNote>
          )}
          <SpeakingLabel>
            {successRateValue && <LabelText>Успішність</LabelText>}
            <SpeakingSelect
              options={successRateOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '0px',
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
              placeholder="Успішність"
              name="successRate"
              className={errors.successRate ? 'wrong' : undefined}
              onChange={successRate => {
                setSuccessRateValue(successRate.value);
                successRate.value &&
                  setErrors(errors => (errors = { ...errors, successRate: false }));
              }}
            />
            {errors.successRate && (
              <StudentDateInputNote> Обов'язкове поле! </StudentDateInputNote>
            )}
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
              placeholder="Темперамент"
              name="temperament"
              className={errors.temperament ? 'wrong' : undefined}
              onChange={temperament => {
                setTemperamentValue(temperament.value);
                temperament.value &&
                  setErrors(errors => (errors = { ...errors, temperament: false }));
              }}
            />
            {errors.temperament && (
              <StudentDateInputNote> Обов'язкове поле! </StudentDateInputNote>
            )}
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
              placeholder="Граматика"
              name="grammar"
              className={errors.grammar ? 'wrong' : undefined}
              onChange={grammar => {
                setGrammarValue(grammar.value);
                grammar.value &&
                  setErrors(errors => (errors = { ...errors, grammar: false }));
              }}
            />
            {errors.grammar && (
              <StudentDateInputNote> Обов'язкове поле! </StudentDateInputNote>
            )}
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
              placeholder="Лексика"
              name="lexis"
              className={errors.lexis ? 'wrong' : undefined}
              onChange={lexis => {
                setLexisValue(lexis.value);
                lexis.value &&
                  setErrors(errors => (errors = { ...errors, lexis: false }));
              }}
            />
            {errors.lexis && (
              <StudentDateInputNote> Обов'язкове поле! </StudentDateInputNote>
            )}
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
              placeholder="Говоріння/вимова"
              name="speaking"
              className={errors.speaking ? 'wrong' : undefined}
              onChange={speaking => {
                setSpeakingValue(speaking.value);
                speaking.value &&
                  setErrors(errors => (errors = { ...errors, speaking: false }));
              }}
            />
            {errors.speaking && (
              <StudentDateInputNote> Обов'язкове поле! </StudentDateInputNote>
            )}
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
              placeholder="Слухання"
              name="listening"
              className={errors.listening ? 'wrong' : undefined}
              onChange={listening => {
                setListeningValue(listening.value);
                listening.value &&
                  setErrors(errors => (errors = { ...errors, listening: false }));
              }}
            />
            {errors.listening && (
              <StudentDateInputNote> Обов'язкове поле! </StudentDateInputNote>
            )}
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
              placeholder="Активність на уроці"
              name="activity"
              className={errors.activity ? 'wrong' : undefined}
              onChange={activity => {
                setActivityValue(activity.value);
                activity.value &&
                  setErrors(errors => (errors = { ...errors, activity: false }));
              }}
            />
            {errors.activity && (
              <StudentDateInputNote> Обов'язкове поле! </StudentDateInputNote>
            )}
          </SpeakingLabel>
          <SpeakingLabel>
            {gradeValue && <LabelText>Оцінка</LabelText>}
            <SpeakingSelect
              options={gradesOptions}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 'none',
                  borderRadius: '0px',
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
              placeholder="Оцінка за урок"
              name="grade"
              className={errors.grade ? 'wrong' : undefined}
              onChange={grade => {
                setGradeValue(grade.value);
                grade.value &&
                  setErrors(errors => (errors = { ...errors, grade: false }));
              }}
            />
            {errors.grade && (
              <StudentDateInputNote> Обов'язкове поле! </StudentDateInputNote>
            )}
          </SpeakingLabel>
          <Label>
            <StudentTextArea
              type="text"
              name="feedback"
              component="textarea"
              placeholder="Фідбек"
            />
            <StudentTextAreaNote component="p" name="feedback" />
          </Label>
          <SpeakingFormBtn type="submit">Підтвердити зміни</SpeakingFormBtn>
        </UserSpeakingEditForm>
      </Formik>
      {isLoading && <Loader />}
    </>
  );
};
