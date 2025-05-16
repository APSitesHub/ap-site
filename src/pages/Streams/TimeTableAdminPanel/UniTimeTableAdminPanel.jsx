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
import { UniTimeTableMarathonEditForm } from './TimeTableCourseLevelEditForm/UniTimeTableMarathonEditForm';
import { UniTimeTableEditForm } from './TimeTableEditForm/UniTimeTableEditForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const UniTimeTableAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [lessonToEdit, setLessonToEdit] = useState({});
  const [scheduleToEdit, setScheduleToEdit] = useState('');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isEditMarathonFormOpen, setIsEditMarathonFormOpen] = useState(false);
  const [uniValue, setUniValue] = useState('');
  const [marathonValue, setMarathonValue] = useState('');
  const [dayValue, setDayValue] = useState('');

  useEffect(() => {
    document.title = 'Polish Universities Timetable Admin Panel | AP Education';

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
          const response = await axios.get('/unitimetable/');
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
  }, [isUserAdmin, isLoading, isEditFormOpen, isEditMarathonFormOpen]);

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
    university: '',
    marathon: '',
    day: '',
    time: '',
    lessonNumber: '',
    topic: '',
  };

  const timetableSchema = yup.object().shape({
    university: yup.string(),
    marathon: yup.string(),
    day: yup.string(),
    time: yup.string(),
    lessonNumber: yup.string(),
    topic: yup.string(),
  });

  const handleTimetableSubmit = async (values, { resetForm }) => {
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
      const response = await axios.post('/unitimetable', values);
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

  const closeMarathonEditForm = e => {
    setIsEditMarathonFormOpen(false);
  };

  const uniOptions = [
    {
      label: 'Pedagogium (Wyższa Szkoła Nauk Społecznych)',
      value: 'Pedagogium (Wyższa Szkoła Nauk Społecznych)',
    },
    {
      label: 'WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)',
      value: 'WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)',
    },
    {
      label: 'WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)',
      value: 'WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)',
    },
    {
      label: 'WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)',
      value: 'WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)',
    },
    {
      label: 'EWSPA (Europejska Wyższa Szkoła Prawa i Administracji w Warszawie)',
      value: 'EWSPA (Europejska Wyższa Szkoła Prawa i Administracji w Warszawie)',
    },
    {
      label: 'Merito (Uniwersytet WSB Merito Warszawa)',
      value: 'Merito (Uniwersytet WSB Merito Warszawa)',
    },
    {
      label: 'WSTiH (Wyższa Szkoła Turystyki i Hotelarstwa w Gdańsku)',
      value: 'WSTiH (Wyższa Szkoła Turystyki i Hotelarstwa w Gdańsku)',
    },
    {
      label: 'WSKM (Wyższa Szkoła Kadr Menedżerskich)',
      value: 'WSKM (Wyższa Szkoła Kadr Menedżerskich)',
    },
    {
      label: 'WSSiP (Wyższa Szkoła Sztuki i Projektowania)',
      value: 'WSSiP (Wyższa Szkoła Sztuki i Projektowania)',
    },
    {
      label: 'WSPA (Wyższa Szkoła Przedsiębiorczości i Administracji)',
      value: 'WSPA (Wyższa Szkoła Przedsiębiorczości i Administracji)',
    },
    {
      label: 'WSE (Wyższa Szkoła Ekonomiczna w Stalowej Woli)',
      value: 'WSE (Wyższa Szkoła Ekonomiczna w Stalowej Woli)',
    },
    {
      label: 'ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)',
      value: 'ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)',
    },
    {
      label: 'SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)',
      value: 'SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)',
    },
    {
      label: 'MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)',
      value: 'MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)',
    },
    {
      label: 'AHNS (Akademia Handlowa Nauk Stosowanych w Radomiu)',
      value: 'AHNS (Akademia Handlowa Nauk Stosowanych w Radomiu)',
    },
  ];

  const pedagogiumMarathonOptions = [
    {
      label: 'Logistics (Pedagogium)',
      value: '72421',
    },
    {
      label: 'Logistics 2 (Pedagogium)',
      value: '72421-2',
    },
    {
      label: 'Kurs Przygotowawczy (Pedagogium)',
      value: '79231',
    },
  ];

  const wstijoMarathonOptions = [
    {
      label: 'Logistics (WSTIJO)',
      value: '78737',
    },
  ];

  const wsbmirMarathonOptions = [
    {
      label: 'Logistics (WSBMiR)',
      value: '80641',
    },
    {
      label: 'Kurs Przygotowawczy (WSBMiR)',
      value: '80640',
    },
  ];

  const ewspaMarathonOptions = [
    {
      label: 'Logistics (EWSPA)',
      value: '81950',
    },
    {
      label: 'Kurs Przygotowawczy (EWSPA)',
      value: '81951',
    },
  ];

  const meritoMarathonOptions = [
    {
      label: 'Logistics (Merito)',
      value: '82851',
    },
    {
      label: 'Kurs Przygotowawczy (Merito)',
      value: '82850',
    },
    {
      label: 'Industrial Automation (Merito)',
      value: '91576',
    },
  ];

  const wstihMarathonOptions = [
    {
      label: 'Logistics (WSTiH)',
      value: '83530',
    },
    {
      label: 'Kurs Przygotowawczy (WSTiH)',
      value: '83568',
    },
  ];

  const wskmMarathonOptions = [
    {
      label: 'Logistics (WSKM)',
      value: '83751',
    },
    {
      label: 'Kurs Przygotowawczy (WSKM)',
      value: '83752',
    },
  ];

  const wssipMarathonOptions = [
    {
      label: 'Logistics (WSSiP)',
      value: '83761',
    },
    {
      label: 'Kurs Przygotowawczy (WSSiP)',
      value: '83765',
    },
  ];

  const wspaMarathonOptions = [
    {
      label: 'Logistics (WSPA)',
      value: '84619',
    },
    {
      label: 'Kurs Przygotowawczy (WSPA)',
      value: '84616',
    },
  ];

  const answpMarathonOptions = [
    { label: 'Logistics (ANSWP)', value: '87841' },
    { label: 'CNC (ANSWP)', value: '87845' },
    { label: 'Management (ANSWP)', value: '92260' },
    { label: 'Online (ANSWP)', value: '92264' },
  ];

  const wseMarathonOptions = [
    {
      label: 'Kurs Przygotowawczy (WSE)',
      value: '84801',
    },
  ];

  const sswMarathonOptions = [
    {
      label: 'SSW',
      value: '92196',
    },
  ];

  const mansMarathonOptions = [
    {
      label: 'MANS',
      value: '92197',
    },
  ];

  const ahnsMarathonOptions = [
    {
      label: 'AHNS',
      value: '92768',
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

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
    }
  };

  const closeEditMarathonFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditMarathonFormOpen(false);
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

  const handleMarathonEdit = async id => {
    setIsEditMarathonFormOpen(true);
    setLessonToEdit(
      lessonToEdit => (lessonToEdit = lessons.find(lesson => lesson._id === id))
    );
  };

  const handleDelete = async (parentId, scheduleId) => {
    setIsLoading(isLoading => (isLoading = true));
    console.log(parentId);

    try {
      const response = await axios.patch(`/unitimetable/schedule/${parentId}`, {
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
                onChange={uni => {
                  setUniValue(uni.value);
                }}
              />
              <FormSelect
                options={
                  uniValue ===
                  'WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)'
                    ? wstijoMarathonOptions
                    : uniValue === 'WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)'
                    ? wsbmirMarathonOptions
                    : uniValue ===
                      'EWSPA (Europejska Wyższa Szkoła Prawa i Administracji w Warszawie)'
                    ? ewspaMarathonOptions
                    : uniValue === 'Merito (Uniwersytet WSB Merito Warszawa)'
                    ? meritoMarathonOptions
                    : uniValue ===
                      'WSTiH (Wyższa Szkoła Turystyki i Hotelarstwa w Gdańsku)'
                    ? wstihMarathonOptions
                    : uniValue === 'WSKM (Wyższa Szkoła Kadr Menedżerskich)'
                    ? wskmMarathonOptions
                    : uniValue === 'WSSiP (Wyższa Szkoła Sztuki i Projektowania)'
                    ? wssipMarathonOptions
                    : uniValue ===
                      'WSPA (Wyższa Szkoła Przedsiębiorczości i Administracji)'
                    ? wspaMarathonOptions
                    : uniValue === 'WSE (Wyższa Szkoła Ekonomiczna w Stalowej Woli)'
                    ? wseMarathonOptions
                    : uniValue ===
                      'ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)'
                    ? answpMarathonOptions
                    : uniValue ===
                      'SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)'
                    ? sswMarathonOptions
                    : uniValue ===
                      'MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)'
                    ? mansMarathonOptions
                    : uniValue === 'AHNS (Akademia Handlowa Nauk Stosowanych w Radomiu)'
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
              <AdminFormBtn type="submit">Додати до розкладу</AdminFormBtn>
            </UsersForm>
          </Formik>
        )}
        <ScheduleList>
          {lessons &&
            lessons
              .sort(
                (a, b) =>
                  a.university.localeCompare(b.university) || a.marathon - b.marathon
              )
              .map(timetable => (
                <ScheduleItem key={timetable._id}>
                  <ScheduleHeading>
                    {timetable.university.split(' ')[0]}{' '}
                    {timetable.university.includes('Pedagogium') &&
                    timetable.marathon === '72421'
                      ? `Logistics ${timetable.marathon}`
                      : timetable.university.includes('Pedagogium') &&
                        timetable.marathon === '72421-2'
                      ? `Logistics 2 ${timetable.marathon.split('-')[0]}`
                      : timetable.university.includes('Pedagogium') &&
                        timetable.marathon === '79231'
                      ? `Preparation Course ${timetable.marathon}`
                      : timetable.university.includes('WSTIJO') &&
                        timetable.marathon === '78737'
                      ? `Logistics ${timetable.marathon}`
                      : timetable.university.includes('WSBMIR') &&
                        timetable.marathon === '80641'
                      ? `Logistics ${timetable.marathon}`
                      : timetable.university.includes('WSBMIR') &&
                        timetable.marathon === '80640'
                      ? `Preparation Course ${timetable.marathon}`
                      : timetable.university.includes('EWSPA') &&
                        timetable.marathon === '81950'
                      ? `Logistics ${timetable.marathon}`
                      : timetable.university.includes('EWSPA') &&
                        timetable.marathon === '81951'
                      ? `Preparation Course ${timetable.marathon}`
                      : timetable.university.includes('Merito') &&
                        timetable.marathon === '82851'
                      ? `Logistics ${timetable.marathon}`
                      : timetable.university.includes('Merito') &&
                        timetable.marathon === '82850'
                      ? `Preparation Course ${timetable.marathon}`
                      : timetable.university.includes('Merito') &&
                        timetable.marathon === '91576'
                      ? `Industrial Automation ${timetable.marathon}`
                      : timetable.university.includes('WSTiH') &&
                        timetable.marathon === '83530'
                      ? `Logistics ${timetable.marathon}`
                      : timetable.university.includes('WSTiH') &&
                        timetable.marathon === '83568'
                      ? `Preparation Course ${timetable.marathon}`
                      : timetable.university.includes('WSKM') &&
                        timetable.marathon === '83751'
                      ? `Logistics ${timetable.marathon}`
                      : timetable.university.includes('WSKM') &&
                        timetable.marathon === '83752'
                      ? `Preparation Course ${timetable.marathon}`
                      : timetable.university.includes('WSSiP') &&
                        timetable.marathon === '83761'
                      ? `Logistics ${timetable.marathon}`
                      : timetable.university.includes('WSSiP') &&
                        timetable.marathon === '83765'
                      ? `Preparation Course ${timetable.marathon}`
                      : timetable.university.includes('WSPA') &&
                        timetable.marathon === '84619'
                      ? `Logistics ${timetable.marathon}`
                      : timetable.university.includes('WSPA') &&
                        timetable.marathon === '84616'
                      ? `Preparation Course ${timetable.marathon}`
                      : timetable.university.includes('ANSWP') &&
                        timetable.marathon === '87841'
                      ? `Logistics Course ${timetable.marathon}`
                      : timetable.university.includes('ANSWP') &&
                        timetable.marathon === '87845'
                      ? `CNC Course ${timetable.marathon}`
                      : timetable.university.includes('ANSWP') &&
                        timetable.marathon === '92260'
                      ? `Management Course ${timetable.marathon}`
                      : timetable.university.includes('ANSWP') &&
                        timetable.marathon === '92264'
                      ? `Online Course ${timetable.marathon}`
                      : timetable.university.includes('WSE') &&
                        timetable.marathon === '84801'
                      ? `Preparation Course ${timetable.marathon}`
                      : timetable.university.includes('SSW') &&
                        timetable.marathon === '92196'
                      ? `Online Course ${timetable.marathon}`
                      : timetable.university.includes('MANS') &&
                        timetable.marathon === '92197'
                      ? `Online Course ${timetable.marathon}`
                      : timetable.university.includes('AHNS') &&
                        timetable.marathon === '92768'
                      ? `Online Course ${timetable.marathon}`
                      : ''}{' '}
                    <UserEditButton onClick={() => handleMarathonEdit(timetable._id)}>
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
                          <ScheduleDataTimeText>{schedule.topic}</ScheduleDataTimeText>
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
            <UniTimeTableEditForm
              lessonToEdit={lessonToEdit}
              scheduleToEdit={scheduleToEdit}
              uniOptions={uniOptions}
              pedagogiumMarathonOptions={pedagogiumMarathonOptions}
              wstijoMarathonOptions={wstijoMarathonOptions}
              wsbmirMarathonOptions={wsbmirMarathonOptions}
              ewspaMarathonOptions={ewspaMarathonOptions}
              meritoMarathonOptions={meritoMarathonOptions}
              wstihMarathonOptions={wstihMarathonOptions}
              wskmMarathonOptions={wskmMarathonOptions}
              wssipMarathonOptions={wssipMarathonOptions}
              wspaMarathonOptions={wspaMarathonOptions}
              answpMarathonOptions={answpMarathonOptions}
              wseMarathonOptions={wseMarathonOptions}
              sswMarathonOptions={sswMarathonOptions}
              mansMarathonOptions={mansMarathonOptions}
              ahnsMarathonOptions={ahnsMarathonOptions}
              daysOptions={daysOptions}
              closeEditForm={closeEditForm}
            />
          </Backdrop>
        )}
        {isEditMarathonFormOpen && (
          <Backdrop onClick={closeEditMarathonFormOnClick} id="close-on-click">
            <UniTimeTableMarathonEditForm
              lessonToEdit={lessonToEdit}
              uniOptions={uniOptions}
              pedagogiumMarathonOptions={pedagogiumMarathonOptions}
              wstijoMarathonOptions={wstijoMarathonOptions}
              wsbmirMarathonOptions={wsbmirMarathonOptions}
              ewspaMarathonOptions={ewspaMarathonOptions}
              meritoMarathonOptions={meritoMarathonOptions}
              wstihMarathonOptions={wstihMarathonOptions}
              wskmMarathonOptions={wskmMarathonOptions}
              wssipMarathonOptions={wssipMarathonOptions}
              wspaMarathonOptions={wspaMarathonOptions}
              answpMarathonOptions={answpMarathonOptions}
              wseMarathonOptions={wseMarathonOptions}
              sswMarathonOptions={sswMarathonOptions}
              mansMarathonOptions={mansMarathonOptions}
              ahnsMarathonOptions={ahnsMarathonOptions}
              closeMarathonEditForm={closeMarathonEditForm}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default UniTimeTableAdminPanel;
