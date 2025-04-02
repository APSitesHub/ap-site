import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  LoginForm,
  UserDeleteButton,
  UserEditButton,
  UsersForm,
} from '../UserAdminPanel/UserAdminPanel.styled';
import {
  FormSelect,
  ScheduleData,
  ScheduleDataDayText,
  ScheduleDataTimeText,
  ScheduleDataTypeText,
  ScheduleHeading,
  ScheduleInfo,
  ScheduleItem,
  ScheduleList,
} from './TimeTableAdminPanel.styled';
import { TimeTableEditForm } from './TimeTableEditForm/TimeTableEditForm';
import { TimeTableCourseLevelEditForm } from './TimeTableCourseLevelEditForm/TimeTableCourseLevelEditForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const TimeTableAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [lessonToEdit, setLessonToEdit] = useState({});
  const [scheduleToEdit, setScheduleToEdit] = useState('');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isEditCourseLevelFormOpen, setIsEditCourseLevelFormOpen] = useState(false);
  const [langValue, setLangValue] = useState('');
  const [levelValue, setLevelValue] = useState('');
  const [courseValue, setCourseValue] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [packageValue, setPackageValue] = useState('');

  useEffect(() => {
    document.title = 'Timetable Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/users/', {});
          console.log(res);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const getLessons = async () => {
      try {
        if (isUserAdmin) {
          const response = await axios.get('/timetable/');
          console.log(response);
          setLessons(lessons => (lessons = [...response.data]));
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLessons();

    const onEscapeClose = event => {
      if (event.code === 'Escape' && isEditFormOpen) {
        closeEditForm();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [isUserAdmin, isLoading, isEditFormOpen, isEditCourseLevelFormOpen]);

  const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post('/admins/login/users', values);
      setAuthToken(response.data.token);
      setIsUserAdmin(isAdmin => (isAdmin = true));
      localStorage.setItem('isAdmin', true);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const initialTimetableValues = {
    lang: '',
    level: '',
    course: '',
    day: '',
    type: '',
    package: '',
    time: '',
    lessonNumber: '',
    teacher: '',
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

  const handleTimetableSubmit = async (values, { resetForm }) => {
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
      const response = await axios.post('/timetable', values);
      console.log(response);
      resetForm();
      alert('Урок додано');
    } catch (error) {
      console.error(error);
      alert('Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу');
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
  };

  const closeCourseLevelEditForm = e => {
    setIsEditCourseLevelFormOpen(false);
  };

  const languageOptions = [
    {
      label: 'Англійська',
      value: 'en',
    },
    {
      label: 'Англійська, діти',
      value: 'enkids',
    },
    {
      label: 'Німецька',
      value: 'de',
    },
    {
      label: 'Німецька, діти',
      value: 'dekids',
    },
    {
      label: 'Польська',
      value: 'pl',
    },
    {
      label: 'Польська, діти',
      value: 'plkids',
    },
  ];

  const levelOptions = [
    {
      label: 'A0',
      value: 'a0',
    },
    {
      label: 'A1',
      value: 'a1',
    },
    {
      label: 'A2',
      value: 'a2',
    },
    {
      label: 'B1',
      value: 'b1',
    },
    {
      label: 'B2',
      value: 'b2',
    },
    {
      label: 'C1',
      value: 'c1',
    },
  ];

  const courseEnglishOptions = [
    {
      label: '10 (Спікінги)',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
    {
      label: '11(Спікінги)',
      value: '11',
    },
    {
      label: '11 PRE',
      value: '11pre',
    },
    {
      label: '11 BEG',
      value: '11beg',
    },
    {
      label: '11 MID',
      value: '11mid',
    },
    {
      label: '11 HIGH',
      value: '11high',
    },
    {
      label: '12',
      value: '12',
    },
    {
      label: '12 PRE',
      value: '12pre',
    },
    {
      label: '12 BEG',
      value: '12beg',
    },
    {
      label: '12 MID',
      value: '12mid',
    },
    {
      label: '12 HIGH',
      value: '12high',
    },
    {
      label: '13',
      value: '13',
    },
    {
      label: '23',
      value: '23',
    },
    {
      label: '23 PRE',
      value: '23pre',
    },
    {
      label: '23 BEG',
      value: '23beg',
    },
    {
      label: '23 MID',
      value: '23mid',
    },
    {
      label: '23 HIGH',
      value: '23high',
    },
    {
      label: '24',
      value: '24',
    },
    {
      label: '24 PRE',
      value: '24pre',
    },
    {
      label: '24 BEG',
      value: '24beg',
    },
    {
      label: '24 MID',
      value: '24mid',
    },
    {
      label: '24 HIGH',
      value: '24high',
    },
    {
      label: '25',
      value: '25',
    },
    {
      label: '31',
      value: '31',
    },
    {
      label: '32',
      value: '32',
    },
    {
      label: '43',
      value: '43',
    },
    {
      label: '44',
      value: '44',
    },
    {
      label: '51',
      value: '51',
    },
    {
      label: '52',
      value: '52',
    },
  ];

  const courseDeutschOptions = [
    {
      label: '10 (Спікінги)',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
    {
      label: '11(Спікінги)',
      value: '11',
    },
    {
      label: '12',
      value: '12',
    },
    {
      label: '12_1',
      value: '12_1',
    },
    {
      label: '12_2',
      value: '12_2',
    },
    {
      label: '12_3',
      value: '12_3',
    },
    {
      label: '23',
      value: '23',
    },
    {
      label: '24',
      value: '24',
    },
    {
      label: '24_1',
      value: '24_1',
    },
    {
      label: '24_2',
      value: '24_2',
    },
    {
      label: '31',
      value: '31',
    },
    {
      label: '32',
      value: '32',
    },
    {
      label: '43',
      value: '43',
    },
    {
      label: '44',
      value: '44',
    },
    {
      label: '51',
      value: '51',
    },
    {
      label: '52',
      value: '52',
    },
  ];

  const courseOptions = [
    {
      label: '10 (Спікінги)',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
    {
      label: '11(Спікінги)',
      value: '11',
    },
    {
      label: '12',
      value: '12',
    },
    {
      label: '23',
      value: '23',
    },
    {
      label: '24',
      value: '24',
    },
    {
      label: '31',
      value: '31',
    },
    {
      label: '32',
      value: '32',
    },
    {
      label: '43',
      value: '43',
    },
    {
      label: '44',
      value: '44',
    },
    {
      label: '51',
      value: '51',
    },
    {
      label: '52',
      value: '52',
    },
  ];

  const levelOptionsWithBeginners = [
    {
      label: 'A0',
      value: 'a0',
    },
    {
      label: 'A1',
      value: 'a1',
    },
    {
      label: 'A2',
      value: 'a2',
    },
    {
      label: 'B1',
      value: 'b1',
    },
    {
      label: 'B1 Beginner',
      value: 'b1beginner',
    },
    {
      label: 'B2',
      value: 'b2',
    },
    {
      label: 'B2 Beginner',
      value: 'b2beginner',
    },
    {
      label: 'C1',
      value: 'c1',
    },
  ];

  const levelOptionsForDe = [
    {
      label: 'A0',
      value: 'a0',
    },
    {
      label: 'A1',
      value: 'a1',
    },
    {
      label: 'A2',
      value: 'a2',
    },
    {
      label: 'B1',
      value: 'b1',
    },
    {
      label: 'B1_1',
      value: 'b1_1',
    },
    {
      label: 'B1_2',
      value: 'b1_2',
    },
    {
      label: 'B2',
      value: 'b2',
    },
    {
      label: 'B2_1',
      value: 'b2_1',
    },
    {
      label: 'B2_2',
      value: 'b2_2',
    },
    {
      label: 'B2_3',
      value: 'b2_3',
    },
    {
      label: 'C1',
      value: 'c1',
    },
  ];

  const levelOptionsForDeKids = [
    {
      label: 'A0',
      value: 'a0',
    },
    {
      label: 'A1',
      value: 'a1',
    },
    {
      label: 'A2',
      value: 'a2',
    },
    {
      label: 'B1',
      value: 'b1',
    },
  ];

  const levelOptionsForPlKids = [
    {
      label: 'A0',
      value: 'a0',
    },
    {
      label: 'A1',
      value: 'a1',
    },
    {
      label: 'A2',
      value: 'a2',
    },
    {
      label: 'B1',
      value: 'b1',
    },
  ];

  const daysOptions = [
    {
      label: 'Понеділок',
      value: '1',
    },
    {
      label: 'Вівторок',
      value: '2',
    },
    {
      label: 'Середа',
      value: '3',
    },
    {
      label: 'Четвер',
      value: '4',
    },
    {
      label: "П'ятниця",
      value: '5',
    },
    {
      label: 'Субота',
      value: '6',
    },
    {
      label: 'Неділя',
      value: '0',
    },
  ];

  const typeOptions = [
    {
      label: 'Вебінар',
      value: 'webinar',
    },
    {
      label: 'Вебінар, повторення',
      value: 'webinar, repeat',
    },
    {
      label: 'Мовна практика',
      value: 'speaking',
    },
  ];

  const packageOptions = [
    {
      label: 'Easy',
      value: 'easy',
    },
    {
      label: 'Easy+',
      value: 'easy+',
    },
    {
      label: 'Basic',
      value: 'basic',
    },
    {
      label: 'Standart',
      value: 'standart',
    },
    {
      label: 'Pro',
      value: 'pro',
    },
    {
      label: 'Online Курс',
      value: 'online',
    },
    {
      label: 'Додаткові мовні практики',
      value: 'sc',
    },
  ];

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
    }
  };

  const closeEditCourseLevelFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditCourseLevelFormOpen(false);
    }
  };

  const handleEdit = async (id, scheduleId) => {
    setIsEditFormOpen(true);
    setLessonToEdit(
      lessonToEdit => (lessonToEdit = lessons.find(lesson => lesson._id === id))
    );
    setScheduleToEdit(scheduleToEdit =>
      lessons
        .find(lesson => lesson._id === id)
        .schedule.find(lesson => lesson._id === scheduleId)
    );
  };

  const handleCourseLevelEdit = async id => {
    setIsEditCourseLevelFormOpen(true);
    setLessonToEdit(
      lessonToEdit => (lessonToEdit = lessons.find(lesson => lesson._id === id))
    );
  };

  const handleDelete = async (parentId, scheduleId) => {
    setIsLoading(isLoading => (isLoading = true));
    console.log(parentId);

    try {
      const response = await axios.patch(`/timetable/schedule/${parentId}`, {
        _id: parentId,
        scheduleId,
      });
      console.log(response);
      alert('Урок видалено');
    } catch (error) {
      console.error(error);
      alert('Десь якась проблема - роби скрін консолі, відправляй Кирилу');
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <AdminPanelSection>
        {!isUserAdmin && (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <Label>
                <AdminInput type="text" name="login" placeholder="Login" />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput type="password" name="password" placeholder="Password" />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Залогінитись</AdminFormBtn>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && (
          <Formik
            initialValues={initialTimetableValues}
            onSubmit={handleTimetableSubmit}
            validationSchema={timetableSchema}
          >
            <UsersForm>
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
                onChange={lang => {
                  setLangValue(lang.value);
                }}
              />
              <FormSelect
                options={
                  langValue === 'enkids'
                    ? levelOptionsWithBeginners
                    : langValue === 'dekids'
                    ? levelOptionsForDeKids
                    : langValue === 'plkids'
                    ? levelOptionsForPlKids
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
                onChange={pack => {
                  setPackageValue(pack.value);
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
                <AdminInput type="text" name="teacher" placeholder="Викладач" />
                <AdminInputNote component="p" name="teacher" />
              </Label>
              <AdminFormBtn type="submit">Додати до розкладу</AdminFormBtn>
            </UsersForm>
          </Formik>
        )}
        <ScheduleList>
          {lessons &&
            lessons
              .sort(
                (a, b) => a.lang.localeCompare(b.lang) || a.level.localeCompare(b.level)
              )
              .map(timetable => (
                <ScheduleItem key={timetable._id}>
                  <ScheduleHeading>
                    {timetable.lang} {timetable.level} {timetable.course}
                    <UserEditButton onClick={() => handleCourseLevelEdit(timetable._id)}>
                      Edit
                    </UserEditButton>
                  </ScheduleHeading>

                  <ScheduleInfo>
                    {timetable.schedule
                      .sort((a, b) => a.day - b.day)
                      .map(schedule => (
                        <ScheduleData key={schedule._id}>
                          <ScheduleDataDayText>
                            {DAYS[schedule.day - 1] || DAYS[DAYS.length - 1]}
                          </ScheduleDataDayText>
                          <ScheduleDataTypeText>{schedule.type}</ScheduleDataTypeText>
                          <ScheduleDataTimeText>{schedule.time}</ScheduleDataTimeText>
                          <ScheduleDataTimeText>
                            {schedule.lessonNumber}
                          </ScheduleDataTimeText>
                          <ScheduleDataTimeText>{schedule.teacher}</ScheduleDataTimeText>
                          <ScheduleDataTimeText>{schedule.package}</ScheduleDataTimeText>
                          <UserEditButton
                            onClick={() => handleEdit(timetable._id, schedule._id)}
                          >
                            Edit
                          </UserEditButton>

                          <UserDeleteButton
                            onClick={() => handleDelete(timetable._id, schedule._id)}
                          >
                            Del
                          </UserDeleteButton>
                        </ScheduleData>
                      ))}
                  </ScheduleInfo>
                </ScheduleItem>
              ))}
        </ScheduleList>
        {isEditFormOpen && (
          <Backdrop onMouseDown={closeEditFormOnClick} id="close-on-click">
            <TimeTableEditForm
              lessonToEdit={lessonToEdit}
              scheduleToEdit={scheduleToEdit}
              languageOptions={languageOptions}
              courseOptions={courseOptions}
              courseEnglishOptions={courseEnglishOptions}
              courseDeutschOptions={courseDeutschOptions}
              levelOptions={levelOptions}
              levelOptionsWithBeginners={levelOptionsWithBeginners}
              levelOptionsForDe={levelOptionsForDe}
              daysOptions={daysOptions}
              typeOptions={typeOptions}
              packageOptions={packageOptions}
              closeEditForm={closeEditForm}
            />
          </Backdrop>
        )}
        {isEditCourseLevelFormOpen && (
          <Backdrop onClick={closeEditCourseLevelFormOnClick} id="close-on-click">
            <TimeTableCourseLevelEditForm
              lessonToEdit={lessonToEdit}
              languageOptions={languageOptions}
              courseOptions={courseOptions}
              courseEnglishOptions={courseEnglishOptions}
              courseDeutschOptions={courseDeutschOptions}
              levelOptions={levelOptions}
              levelOptionsWithBeginners={levelOptionsWithBeginners}
              levelOptionsForDe={levelOptionsForDe}
              closeCourseLevelEditForm={closeCourseLevelEditForm}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default TimeTableAdminPanel;
