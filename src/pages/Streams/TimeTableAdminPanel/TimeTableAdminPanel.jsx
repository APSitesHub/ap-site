import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
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

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const TimeTableAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [lessons, setLessons] = useState([]);
  // eslint-disable-next-line
  const [lessonToEdit, setLessonToEdit] = useState({});
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [langValue, setLangValue] = useState('');
  const [levelValue, setLevelValue] = useState('');
  const [dayValue, setDayValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [packageValue, setPackageValue] = useState('');
  // console.log(useField);
  // console.log(FieldProps);
  // console.log(useField);
  // console.log(field);
  // console.log(meta);

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

  const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

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
  };

  const timetableSchema = yup.object().shape({
    lang: yup.string(),
    level: yup.string(),
    day: yup.string(),
    type: yup.string(),
    package: yup.string(),
    time: yup.string(),
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
        },
      ],
    };

    console.log(values);
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post(
        'http://localhost:5000/timetable',
        values
      );
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
      label: 'Польська',
      value: 'pl',
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

  const handleEdit = async id => {
    setIsEditFormOpen(true);
    setLessonToEdit(
      lessonToEdit => (lessonToEdit = lessons.find(lesson => lesson._id === id))
    );
  };

  const handleDelete = async (id, parentId) => {
    setIsLoading(isLoading => (isLoading = true));
    console.log(id);

    try {
      const response = await axios.patch(
        `http://localhost:5000/timetable/schedule/${id}`,
        { _id: parentId, scheduleId: id }
      );
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
                options={levelOptions}
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
              <AdminFormBtn type="submit">Додати до розкладу</AdminFormBtn>
            </UsersForm>
          </Formik>
        )}
        <ScheduleList>
          {lessons &&
            lessons.map(timetable => (
              <ScheduleItem key={timetable._id}>
                <ScheduleHeading>
                  {timetable.lang} {timetable.level}
                </ScheduleHeading>
                <ScheduleInfo>
                  {timetable.schedule.map(schedule => (
                    <ScheduleData key={schedule._id}>
                      <ScheduleDataDayText>
                        {DAYS[schedule.day - 1]}
                      </ScheduleDataDayText>
                      <ScheduleDataTypeText>
                        {schedule.type}
                      </ScheduleDataTypeText>
                      <ScheduleDataTimeText>
                        {schedule.time}
                      </ScheduleDataTimeText>
                      <UserEditButton onClick={() => handleEdit(schedule._id)}>
                        Edit
                      </UserEditButton>

                      <UserDeleteButton
                        onClick={() =>
                          handleDelete(schedule._id, timetable._id)
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
      </AdminPanelSection>
    </>
  );
};
