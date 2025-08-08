import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { StyledDatePicker } from 'pages/TeacherPage/TeacherPageSpeakingEditForm/TeacherPageSpeakingEditForm.styled';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import { AdminInput, LoginForm } from '../ToursAdminPanel/ToursAdminPanel.styled';
import {
  AdminFormBtn,
  AdminInputNote,
  AdminPanelSection,
  UserCell,
  UserDBRow,
  UserHeadCell,
} from '../UserAdminPanel/UserAdminPanel.styled';
import {
  AppointmentBody,
  AppointmentCaption,
  AppointmentCell,
  AppointmentDBTable,
  AppointmentSpan,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
} from './AppointmentsAdminPanel.styled';

// axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
axios.defaults.baseURL = 'http://localhost:5000/';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const AppointmentsAdminPanel = () => {
  const [teachers, setTeachers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [startOfRange, setStartOfRange] = useState(
    new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1))
  );
  const [endOfRange, setEndOfRange] = useState(
    new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth() + 1, 0, -3, 59, 59, 999)
    )
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showTeachersWithoutAppointments, setShowTeachersWithoutAppointments] =
    useState(false);

  useEffect(() => {
    document.title = 'Altegio Appointments Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/teachers', {});
          setIsUserAdmin(true);
          setAuthToken(res.data.newToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();
  }, []);

  useEffect(() => {
    const getTeachers = async () => {
      setIsLoading(true);
      try {
        if (isUserAdmin) {
          const { data } = await axios.get('/teachers/basic');

          setTeachers(tours => (tours = data.filter(teacher => teacher.altegioId)));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTeachers();
  }, [isUserAdmin]);

  useEffect(() => {
    const getAppointments = async () => {
      setIsLoading(isLoading => (isLoading = true));

      try {
        if (isUserAdmin) {
          const endOfDay = new Date(endOfRange);
          endOfDay.setHours(26, 59, 59, 999);

          const { data } = await axios.get('/appointments', {
            params: {
              start: startOfRange,
              end: endOfDay,
            },
          });

          setAppointments(appointments => (appointments = data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAppointments();
  }, [isUserAdmin, startOfRange, endOfRange]);

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
      const response = await axios.post('/admins/login/teachers', values);
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

  const getStatusLabel = status => {
    switch (status) {
      case '0':
        return 'Очікує';
      case '1':
        return 'Проведено';
      case '-1':
        return "Не з'явився";
      default:
        return '';
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

        {isUserAdmin && teachers.length > 0 && (
          <AppointmentDBTable>
            <AppointmentCaption>
              Записи на заняття в Altegio за період{' '}
              <StyledDatePicker
                selected={startOfRange}
                startDate={startOfRange}
                endDate={endOfRange}
                dateFormat="dd.MM.yyyy"
                onChange={([start, end]) => {
                  setStartOfRange(start);
                  setEndOfRange(end);
                }}
                selectsRange
                calendarStartDay={1}
                shouldCloseOnSelect={true}
              />
              <CheckboxContainer>
                <CheckboxLabel>
                  Показати видалені записи
                  <CheckboxInput
                    type="checkbox"
                    name="showDeleted"
                    id="showDeleted"
                    checked={showDeleted}
                    onChange={() => setShowDeleted(showDeleted => !showDeleted)}
                  />
                </CheckboxLabel>
                <CheckboxLabel>
                  Показати тічерів без актуальних записів
                  <CheckboxInput
                    type="checkbox"
                    name="showTeachersWithoutAppointments"
                    id="showTeachersWithoutAppointments"
                    checked={showTeachersWithoutAppointments}
                    onChange={() =>
                      setShowTeachersWithoutAppointments(showTeachers => !showTeachers)
                    }
                  />
                </CheckboxLabel>
              </CheckboxContainer>
            </AppointmentCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>Ім'я</UserHeadCell>
                <UserHeadCell>Altegio ID</UserHeadCell>
                <UserHeadCell>CRM ID</UserHeadCell>
                <UserHeadCell>Сума записів</UserHeadCell>
                <UserHeadCell>Записи</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {teachers
                .filter(teacher =>
                  showTeachersWithoutAppointments
                    ? teacher
                    : appointments.some(
                        appointment => Number(appointment.teacherId) === teacher.altegioId
                      )
                )
                .map(teacher => (
                  <UserDBRow key={teacher._id}>
                    <UserCell>{teacher.name}</UserCell>
                    <UserCell>
                      <a
                        href={`https://apeducation.kommo.com/leads/detail/${teacher.crmId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {teacher.crmId}
                      </a>
                    </UserCell>
                    <UserCell>
                      <a
                        href={`https://app.alteg.io/timetable/761978#master_id=${teacher.altegioId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {teacher.altegioId}
                      </a>
                    </UserCell>
                    {(() => {
                      const filteredAppointments = appointments
                        .filter(appointment =>
                          showDeleted
                            ? appointment.teacherId === String(teacher.altegioId)
                            : appointment.teacherId === String(teacher.altegioId) &&
                              !appointment.isDeleted
                        )
                        .sort(
                          (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime)
                        );

                      return (
                        <>
                          <UserCell>{filteredAppointments.length}</UserCell>
                          <AppointmentCell>
                            {filteredAppointments.map(appointment => (
                              <AppointmentBody
                                dataStatus={appointment.status}
                                deleted={appointment.isDeleted}
                                key={appointment._id}
                              >
                                <AppointmentSpan componentWidth="6em">
                                  {appointment.appointmentId}
                                </AppointmentSpan>
                                <AppointmentSpan componentWidth="15em">
                                  {appointment.leadName}
                                </AppointmentSpan>
                                <AppointmentSpan componentWidth="15em">
                                  {(() => {
                                    const str = new Date(
                                      appointment.startDateTime
                                    ).toLocaleString('uk-UA', {
                                      weekday: 'short',
                                      year: 'numeric',
                                      month: 'numeric',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    });
                                    return str[0].toUpperCase() + str.slice(1);
                                  })()}{' '}
                                  -{' '}
                                  {new Date(appointment.endDateTime).toLocaleTimeString(
                                    'uk-UA',
                                    { hour: '2-digit', minute: '2-digit' }
                                  )}
                                </AppointmentSpan>
                                <AppointmentSpan componentWidth="5em">
                                  <a
                                    href={`https://apeducation.kommo.com/leads/detail/${appointment.leadId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {appointment.leadId}
                                  </a>
                                </AppointmentSpan>
                                <AppointmentSpan componentWidth="7em">
                                  {getStatusLabel(appointment.status)}
                                </AppointmentSpan>
                              </AppointmentBody>
                            ))}
                          </AppointmentCell>
                        </>
                      );
                    })()}
                  </UserDBRow>
                ))}
            </tbody>
          </AppointmentDBTable>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default AppointmentsAdminPanel;
