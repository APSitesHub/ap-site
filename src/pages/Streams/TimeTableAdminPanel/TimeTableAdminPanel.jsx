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

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const TimeTableAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [lessonToEdit, setLessonToEdit] = useState({});
  const [scheduleToEdit, setScheduleToEdit] = useState('');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [langValue, setLangValue] = useState('');
  const [levelValue, setLevelValue] = useState('');
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
  }, [isUserAdmin, isLoading, isEditFormOpen]);

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
      alert(
        'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу'
      );
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
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

  const levelOptionsForDeKids = [
    {
      label: 'A1',
      value: 'a1',
    },
  ];

  const levelOptionsForPlKids = [
    {
      label: 'A1',
      value: 'a1',
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
      label: 'Student',
      value: 'student',
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
      label: 'VIP Pro',
      value: 'vip',
    },
    {
      label: 'Online Курс',
      value: 'online',
    },
  ];

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
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
                <AdminInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
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
              <AdminFormBtn type="submit">Додати до розкладу</AdminFormBtn>
            </UsersForm>
          </Formik>
        )}
        <ScheduleList>
          {lessons &&
            lessons
              .sort(
                (a, b) =>
                  a.lang.localeCompare(b.lang) || a.level.localeCompare(b.level)
              )
              .map(timetable => (
                <ScheduleItem key={timetable._id}>
                  <ScheduleHeading>
                    {timetable.lang} {timetable.level}
                  </ScheduleHeading>
                  <ScheduleInfo>
                    {timetable.schedule
                      .sort((a, b) => a.day - b.day)
                      .map(schedule => (
                        <ScheduleData key={schedule._id}>
                          <ScheduleDataDayText>
                            {DAYS[schedule.day - 1] || DAYS[DAYS.length - 1]}
                          </ScheduleDataDayText>
                          <ScheduleDataTypeText>
                            {schedule.type}
                          </ScheduleDataTypeText>
                          <ScheduleDataTimeText>
                            {schedule.time}
                          </ScheduleDataTimeText>
                          <ScheduleDataTimeText>
                            {schedule.lessonNumber}
                          </ScheduleDataTimeText>
                          <ScheduleDataTimeText>
                            {schedule.teacher}
                          </ScheduleDataTimeText>
                          <ScheduleDataTimeText>
                            {schedule.package}
                          </ScheduleDataTimeText>
                          <UserEditButton
                            onClick={() =>
                              handleEdit(timetable._id, schedule._id)
                            }
                          >
                            Edit
                          </UserEditButton>

                          <UserDeleteButton
                            onClick={() =>
                              handleDelete(timetable._id, schedule._id)
                            }
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
          <Backdrop onClick={closeEditFormOnClick} id="close-on-click">
            <TimeTableEditForm
              lessonToEdit={lessonToEdit}
              scheduleToEdit={scheduleToEdit}
              languageOptions={languageOptions}
              levelOptions={levelOptions}
              levelOptionsWithBeginners={levelOptionsWithBeginners}
              daysOptions={daysOptions}
              typeOptions={typeOptions}
              packageOptions={packageOptions}
              closeEditForm={closeEditForm}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};
